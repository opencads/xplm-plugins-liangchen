import { Type } from "../../../System/Type";
import { FullName } from "../FullNameScript/FullName";
import { ParameterInfo } from "../../../System/Reflection/ParameterInfo";
import { Assembly } from "../../../System/Reflection/Assembly";
export class reflection {
    public GetType(): Type {
        return {} as any;
    }
    public ToString(): string {
        return {} as any;
    }
    public Equals(obj?: any): boolean {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public static getType(typeName?: string): Type {
        return {} as any;
    }
    public static getTypeByFullName(fullName?: FullName): Type {
        return {} as any;
    }
    public static getTypes(regexString?: string): Type[] {
        return {} as any;
    }
    public static isParams(parameter?: ParameterInfo): boolean {
        return {} as any;
    }
    public static parseFullName(fullName?: string): FullName {
        return {} as any;
    }
    public static getEnumarables(type?: Type): Type[] {
        return {} as any;
    }
    public static isImplicitFromJson(type?: Type): boolean {
        return {} as any;
    }
    public static getReferencedAssemblies(assembly?: Assembly, deepth?: number): AssemblyName[] {
        return {} as any;
    }
    public static loadDependiencies(assembly_or_depth?: Assembly | number, depth?: number): void {
        return {} as any;
    }
}