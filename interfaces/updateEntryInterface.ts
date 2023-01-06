export interface updateEntryInterface {
    data:       Data;
    status:     number;
    statusText: string;
    headers:    WelcomeHeaders;
    config:     Config;
    request:    Request;
}

export interface Config {
    transitional:      Transitional;
    adapter:           string[];
    transformRequest:  null[];
    transformResponse: null[];
    timeout:           number;
    xsrfCookieName:    string;
    xsrfHeaderName:    string;
    maxContentLength:  number;
    maxBodyLength:     number;
    env:               Request;
    headers:           ConfigHeaders;
    baseURL:           string;
    method:            string;
    url:               string;
    data:              string;
}

export interface Request {
}

export interface ConfigHeaders {
    Accept:         string;
    "Content-Type": string;
}

export interface Transitional {
    silentJSONParsing:   boolean;
    forcedJSONParsing:   boolean;
    clarifyTimeoutError: boolean;
}

export interface Data {
    _id:         string;
    description: string;
    createdAt:   number;
    status:      string;
    __v:         number;
}

export interface WelcomeHeaders {
    connection:       string;
    "content-length": string;
    "content-type":   string;
    date:             string;
    etag:             string;
    "keep-alive":     string;
    vary:             string;
}
