import Vue from 'vue';
import 'assets/style/element-#FFD100/index.css';
import {
    Table,
    Form,
    FormItem,
    Button,
    Input,
    TableColumn,
    Alert,
    Row,
    Col,
    Loading,
    MessageBox,
    Message,
    Notification,
    Pagination,
    Dialog,
    Select,
    Option,
    Radio,
    RadioGroup,
    RadioButton,
    DatePicker,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Popover,
    Switch,
    Tag,
    ColorPicker,
    Upload,
  Scrollbar

} from 'element-ui'



Vue.prototype.$ELEMENT = {
    size: 'mini'
}

export default function elementui() {
    Vue.use(Table);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Button);
    Vue.use(Input);
    Vue.use(TableColumn);
    Vue.use(Alert);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Loading);

    Vue.use(Pagination);
    Vue.use(Dialog);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(RadioButton);
    Vue.use(DatePicker);

    Vue.use(Checkbox);
    Vue.use(Popover);
    Vue.use(CheckboxButton);
    Vue.use(CheckboxGroup);
    Vue.use(Switch);
    Vue.use(Tag);
    Vue.use(ColorPicker);
    Vue.use(Upload);
    Vue.use(Scrollbar);
    // Vue.use(MessageBox);
    // Vue.use(Message);
    // Vue.use(Notification);
    Vue.use(Loading.directive);

    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
}
