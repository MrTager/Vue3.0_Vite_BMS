# excample

## Input

```js
 {
    name: "name",
    label: "输入框",
    componentType: "Input",
    defaultValue: "",
    value: "",
    options: {
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
    callback: ({ e, type }: any) => {
      console.log("name联动操作", e, type);
    },
  },

```

## Select

```js
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
```

## DatePicker

```js
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
    callback: ({ e, type, item }: any) => {
    },
  },

  {
    name: "datePicker",
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
    callback: ({ e, type, item }: any) => {
    },
  },
```

## Switch

```js
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
    callback: ({ e, type, item }: any) => {
    },
  },
```

## CheckBoxGroup

```js
{
    name: "checkboxgroup",
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
    callback: ({ e, type, item }: any) => {
    }
},
```

## RadioBox

```js
  {
    name: "radiogroup",
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
```
