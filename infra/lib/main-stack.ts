import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CorsFunctionConstruct } from "./functions/cors-function-construct";
import CorsRoleConstruct from "./iam/cors-role-contruct";
import SystemManagerConstruct from "./parameter/system-manager-construct";

export class MainStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);
        const version = new Date().toISOString();
        const parameter = new SystemManagerConstruct(
            this,
            "ParameterConstruct"
        );

        const corsFunc = new CorsFunctionConstruct(this, "CorsFunction", {
            version: version,
            parameterPath: parameter.ParameterPath,
            region: this.region,
            accountNumber: this.account,
        });

        new CorsRoleConstruct(this, "CorsRole", {
            func: corsFunc.CorsFunc,
        });
    }
}
