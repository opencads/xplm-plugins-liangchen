import { args, env, setLoggerPath } from '../.tsc/context';
import { Json } from '../.tsc/TidyHPC/LiteJson/Json';
import { apis } from '../.tsc/Cangjie/TypeSharp/System/apis';
import { axios } from '../.tsc/Cangjie/TypeSharp/System/axios';
import { Path } from '../.tsc/System/IO/Path';
import { File } from '../.tsc/System/IO/File';
import { UTF8Encoding } from '../.tsc/System/Text/UTF8Encoding';
import { datetimeUtils } from "../.tsc/Cangjie/TypeSharp/System/datetimeUtils";
import { DocumentInterface, ICheckInInput, IImportInput, WebMessage } from '../interfaces';
import { LiangchenCheckInInput, LiangchenCheckInPart } from './interfaces';
import { Directory } from '../.tsc/System/IO/Directory';

let utf8 = new UTF8Encoding(false);
let parameters = {} as { [key: string]: string };
for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (arg.startsWith("--")) {
        let key = arg.substring(2);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
    else if (arg.startsWith("-")) {
        let key = arg.substring(1);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
}
console.log(parameters);

let cacheDirectory = Path.Combine(env('userprofile'), ".xplm", "cache");
if (Directory.Exists(cacheDirectory) == false) {
    Directory.CreateDirectory(cacheDirectory);
}
let cacheLoginJsonPath = Path.Combine(cacheDirectory, "login.json");
let contextJsonPath = Path.Combine(cacheDirectory, "context.json");

let callPlugin = async (pluginName: string, input: any) => {
    let response = await apis.runAsync("run", {
        PluginName: pluginName,
        Input: input
    });
    if (response.StatusCode == 200) {
        let msg = response.Body as WebMessage;
        if (msg.success) {
            return msg.data.Output;
        }
        else {
            throw msg.message;
        }
    }
    else {
        throw `Failed, status code: ${response.StatusCode}`;
    }
};

let importDocumentsToWorkspace = async (input: IImportInput) => {
    return await callPlugin('workspace-import-files', input) as {
        importResult: DocumentInterface[]
    };
};

let getContentArchivePath = async (contentMD5: string) => {
    let response = await apis.runAsync("getContentArchivePath", {
        contentMD5
    });
    if (response.StatusCode == 200) {
        let msg = response.Body as WebMessage;
        if (msg.success) {
            return msg.data as string;
        }
        else {
            throw msg.message;
        }
    }
    else {
        throw `Failed, status code: ${response.StatusCode}`;
    }
};

let main = async () => {
    let inputPath = parameters.i ?? parameters.input;
    let outputPath = parameters.o ?? parameters.output;
    let loggerPath = parameters.l ?? parameters.logger;
    let progresserPath = parameters.p ?? parameters.progress ?? parameters.progresser;
    if (inputPath == undefined || inputPath == null) {
        throw "inputPath is required";
    }
    if (outputPath == undefined || outputPath == null) {
        throw "outputPath is required";
    }
    if (loggerPath == undefined || loggerPath == null) {
        throw "loggerPath is required";
    }
    let contextJson = {} as any;
    if (File.Exists(contextJsonPath)) {
        contextJson = Json.Load(contextJsonPath);
    }
    let input = Json.Load(inputPath) as ICheckInInput;
    let output = {} as any;
    setLoggerPath(loggerPath);
    // 先进行本地归档
    let importInput = {
        Items: []
    } as IImportInput;
    let fileDirectory = "";
    for (let item of input.Items) {
        if (fileDirectory == "") {
            fileDirectory = Path.GetDirectoryName(item.FilePath);
        }
        importInput.Items.push({
            FilePath: item.FilePath
        });
    }
    let importResult = await importDocumentsToWorkspace(importInput);
    // 生成检入Json
    let checkInJson = {
        part: []
    } as LiangchenCheckInInput;
    for (let item of importResult.importResult) {
        let part = {
            number: item.partNumber0,
            name: item.displayName,
            cadName: item.formatFileName,
            containerId: contextJson.containerId,
        } as LiangchenCheckInPart;
        checkInJson.part.push(part);
    }

    File.WriteAllText(outputPath, JSON.stringify(output), utf8);
};

await main();
