import { Regex } from "../../../System/Text/RegularExpressions/Regex";
import { Session } from "./Session";
import { Task } from "../../../System/Threading/Tasks/Task";
import { Type } from "../../../System/Type";
export class UrlRouterFilterRecord {
    public ToString(): string {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public Equals(obj_or_other?: any | UrlRouterFilterRecord): boolean {
        return {} as any;
    }
    public <Clone>$(): UrlRouterFilterRecord {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public constructor(Pattern?: string, Regex?: Regex, Handler?: ((arg0?:Session)=>Promise<void>)) {
    }
    public static op_Inequality(left?: UrlRouterFilterRecord, right?: UrlRouterFilterRecord): boolean {
        return {} as any;
    }
    public static op_Equality(left?: UrlRouterFilterRecord, right?: UrlRouterFilterRecord): boolean {
        return {} as any;
    }
    public get Pattern(): string {
        return {} as any;
    }
    public set Pattern(value: string) {
    }
    public get Regex(): Regex {
        return {} as any;
    }
    public set Regex(value: Regex) {
    }
    public get Handler(): ((arg0?:Session)=>Promise<void>) {
        return {} as any;
    }
    public set Handler(value: ((arg0?:Session)=>Promise<void>)) {
    }
}