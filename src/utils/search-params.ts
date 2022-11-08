import qs from "qs";

const stringifyOptions: qs.IStringifyOptions = {
  addQueryPrefix: true,
  arrayFormat: 'comma',
  encode: false
}

const parseOptions: qs.IParseOptions = {
  ignoreQueryPrefix: true,
  comma: true,
}

export default {
  parse: (query: string) => {
    return qs.parse(query, parseOptions) || {}
  },

  stringify: (params: any) => {
    return qs.stringify(params, stringifyOptions);
  }
}
