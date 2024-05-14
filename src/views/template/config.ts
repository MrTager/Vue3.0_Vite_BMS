interface ISearchListItem {
  label: string;
  type: string;
  field: string;
  format?: any;
  extra?: string;
}
export interface ITableConfig {
  loading?: boolean;
  pageNumber: number;
  pageSize: number;
  total: number;
  columns: any[];
}
export interface ITableRows {
  label: string;
  prop: string;
  slotName: string;
  align?: string;
  fixed?: string;
  width?: number;
  minWidth?: number;
  sortable?: string;
  showOverflowTooltip?: boolean;
}

/**
 * 筛选查询配置
 *
 */
export const SearchList: ISearchListItem[] = [
  { label: "事项名称", type: "input", field: "taskName_like" },
  { label: "事项编码", type: "input", field: "catalogCode_like" },
  {
    label: "事项类型",
    type: "select",
    field: "taskType",
    format: [],
    extra: "itemsType",
  },
  {
    label: "行使层级",
    type: "select",
    field: "useLevel",
    format: [],
    extra: "levelRank",
  },
];

export const QueryNormal = {
  taskName_like: undefined,
  catalogCode_like: undefined,
  taskType: undefined,
  useLevel: undefined,
};

/**
 * 表格相关配置
 *
 */
export const TableConfig: ITableConfig = {
  loading: false,
  pageNumber: 0,
  pageSize: 10,
  total: 0,
  columns: [
    {
      label: "事项名称",
      prop: "taskSubName",
      slotName: "taskSubName",
      align: "left",
      showOverflowTooltip: true,
      minWidth: 270,
    },
    {
      label: "事项编码",
      prop: "subCatalogCode",
      slotName: "subCatalogCode",
      align: "left",
      minWidth: 200,
    },
    {
      label: "事项类型",
      sortable: "custom",
      prop: "taskTypeText",
      align: "left",
      minWidth: 150,
    },
    {
      label: "行使层级",
      sortable: "custom",
      prop: "useLevelText",
      align: "left",
      minWidth: 180,
      showOverflowTooltip: true,
    },
    {
      label: "审核状态",
      prop: "approvalStatusText",
      slotName: "approvalStatus",
      align: "left",
      minWidth: 180,
    },
    {
      label: "创建时间",
      sortable: "custom",
      prop: "createDate",
      align: "left",
      minWidth: 200,
    },
    {
      label: "操作",
      prop: "operation",
      slotName: "operation",
      fixed: "right",
      width: 120,
      align: "center",
    },
  ],
};

/**
 * 接口
 *
 */
export const GetPage = async (data: any) => {
  //导入接口
  return Promise.resolve({
    code: 200,
    data: {
      total: 0,
      pageSize: 0,
      pageNumber: 0,
      data: [],
    },
  });
};
/**
 * 弹窗表单配置
 *
 */
export const formDialogConfig = {
  title: "新增",
  width: "50%",
  labelWidth: "100px",
  formItems: [
    {
      label: "名称",
      prop: "name",
      type: "input",
      placeholder: "请输入名称",
    },
    {
      label: "描述",
      prop: "description",
      type: "input",
      placeholder: "请输入描述",
    },
  ],
};

/**
 * 动态表单配置
 *
 */
export const FormConfig = [
  {
    name: "name",
    label: "输入框",
    componentType: "Input",
    defaultValue: "",
    value: "",
    dataType: "string",
    options: {
      placeholder: "请输入内容",
      disabled: false,
      visible: true,
      clearable: true,
      readonly: false,
      rules: [
        {
          required: true,
          message: "请输入名称",
          trigger: "blur",
        },
      ],
    },
    callback: ({ e, type }: any) => {},
  },
  {
    name: "selectOption",
    label: "下拉选择",
    componentType: "Select",
    defaultValue: "",
    value: "",
    dataType: "string",
    options: {
      placeholder: "请选择内容",
      disabled: false,
      visible: true,
      clearable: true,
      readonly: false,
      selectOptions: [
        {
          label: "选项1",
          value: "选项1",
        },
        {
          label: "选项2",
          value: "选项2",
        },
      ],
      rules: [
        {
          required: true,
          message: "请选择",
          trigger: "change",
        },
      ],
    },
    callback: ({ e, type, item }: any) => {},
  },
  {
    name: "datePicker",
    label: "时间选择",
    componentType: "DatePicker",
    defaultValue: "",
    value: "",
    dataType: "date",
    options: {
      placeholder: "请选择时间",
      disabled: false,
      visible: true,
      clearable: true,
      readonly: false,
      type: "date", //日为单位 week周 year年 month月
      rules: [
        {
          type: "date",
          required: true,
          message: "请选择",
          trigger: "change",
        },
      ],
    },
    callback: ({ e, type, item }: any) => {},
  },
  {
    name: "switch",
    label: "开关",
    componentType: "Switch",
    defaultValue: false,
    value: false,
    dataType: "boolean",
    options: {
      disabled: false,
      visible: true,
      readonly: false,
      rules: [
        {
          required: true,
          message: "请选择",
          trigger: "change",
        },
      ],
    },
    callback: ({ e, type, item }: any) => {},
  },
  {
    name: "datePicker1",
    label: "时间选择",
    componentType: "DatePicker",
    defaultValue: [],
    value: [],
    dataType: "array",
    options: {
      placeholder: "请选择时间",
      disabled: false,
      visible: true,
      clearable: true,
      readonly: false,
      type: "daterange", //日为单位 week周 year年 month月 daterange日期范围
      rules: [
        {
          type: "daterange",
          required: true,
          message: "请选择",
          trigger: "change",
        },
      ],
    },
    callback: ({ e, type, item }: any) => {},
  },
  {
    name: "checkBoxGroup",
    label: "多选框",
    componentType: "CheckBoxGroup",
    defaultValue: [],
    value: [],
    dataType: "array",
    options: {
      disabled: false,
      visible: true,
      readonly: false,
      selectOptions: [
        {
          label: "选项1",
          value: "选项1",
        },
        {
          label: "选项2",
          value: "选项2",
        },
      ],
      rules: [
        {
          required: true,
          message: "请选择",
          trigger: "change",
        },
      ],
    },
    callback: ({ e, type, item }: any) => {},
  },
  {
    name: "radioGroup",
    label: "单选框",
    componentType: "RadioGroup",
    defaultValue: "",
    value: "",
    dataType: "string",
    options: {
      disabled: false,
      visible: true,
      readonly: false,
      selectOptions: [
        {
          label: "选项1",
          value: "选项1",
        },
        {
          label: "选项2",
          value: "选项2",
        },
      ],
      rules: [
        {
          required: true,
          message: "请选择",
          trigger: "change",
        },
      ],
    },
    callback: ({ e, type, item }: any) => {},
  },
  {
    name: "textarea",
    label: "多行输入框",
    componentType: "Input",
    defaultValue: "",
    value: "",
    options: {
      type: "textarea",
      rows: 4,
      placeholder: "请输入内容",
      disabled: false,
      visible: true,
      clearable: true,
      rules: [
        {
          required: true,
          message: "请输入名称",
          trigger: "blur",
        },
      ],
    },
    callback: ({ e, type }: any) => {},
  },
  // {
  //   name: "tableListGroup",
  //   label: "表格列表",
  //   componentType: "TableListGroup",
  //   defaultValue: [],
  //   value: [],
  //   options: {
  //     type: "normal",
  //     disabled: false,
  //     visible: true,
  //     clearable: true,
  //     columnsOptions: [
  //       {
  //         name:"第一列输入框组件",
  //         key:"column1",
  //         component:"Input",
  //         value:"",
  //       },
  //       {
  //         name:"第二列选择框组件",
  //         key:"column2",
  //         component:"Select",
  //         value:"",
  //         options:[
  //           {
  //             label:"选项1",
  //             value:"1"
  //           },
  //           {
  //             label:"选项2",
  //             value:"2"
  //           }
  //         ]
  //       }
  //     ],
  //     rules: [
  //       {
  //         required: true,
  //         message: "请至少填写一行",
  //         trigger: "blur",
  //       },
  //     ],
  //   },
  //   callback: ({ e, type }: any) => {
  //   },
  // },
];

/**
 * 枚举值
 *
 */

/**
 * 函数
 *
 *
 */
