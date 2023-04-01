import { Construct } from "constructs";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

export default class SystemManagerConstruct extends Construct {
    private readonly _parameter: StringParameter;

    get Parameter(): StringParameter {
        return this._parameter;
    }

    get ParameterPath(): string {
        return "/cors";
    }

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this._parameter = new StringParameter(scope, "CorsParameter", {
            parameterName: "/cors/ALLOWED_ORIGINS",
            stringValue: `["http://localhost:8000","http://localhost:19006","https://your.custom.domain]`,
        });
    }
}
