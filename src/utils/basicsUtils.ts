/**
 *
 * @param data QueryForm入参
 * @returns Table查询的入参
 */

export const formationQueryFormParams = (data: any) => {
  return Object.keys(data).reduce((value: any, el: string) => {
    const v = data[el];
    if (v === undefined || v === null || v === "") {
      return value;
    }
    value[el] = v;
    return value;
  }, {});
};
