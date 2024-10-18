import type { ApiRouter } from "@/types/ApiRouter.js";
export default function TypedFetch<MethodType extends keyof ApiRouter, EndpointType extends keyof ApiRouter[MethodType], SearchParamsType extends ApiRouter[MethodType][EndpointType]["searchParams"]>(props: {
    method: MethodType;
    baseUrl: string;
    endpoint: EndpointType;
    searchParams: SearchParamsType;
}): Promise<ApiRouter[MethodType][EndpointType]["response"]>;
