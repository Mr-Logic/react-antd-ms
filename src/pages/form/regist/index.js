import React from 'react'
import { Card, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, message, Icon, InputNumber  } from 'antd'
import moment from 'moment'
import './index.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea

class FormRegist extends React.Component {
    state = {}
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            userImg: imageUrl,
            loading: false,
          }));
        }
    }

    handleRegist = () => {
        let userInfo = this.props.form.getFieldsValue()
        this.props.form.validateFields((err, value) => {
            if (!err) {
                message.success(`
                    ${userInfo.userName} 恭喜你，通过校验！
                `)
                console.log(JSON.stringify(userInfo))
            }
        })
    }
      
    render () {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 20
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal"  style={{width:420}}>
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                               getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        },
                                        {
                                            min: 5,
                                            max: 15,
                                            message: '用户名必须在5-15位之间'
                                        },
                                        {
                                           pattern: new RegExp('^\\w+$', 'g'),
                                           message: '用户名只能包含字母、数字或_'
                                        }
                                    ]
                               })(
                                   <Input prefix={<Icon type="user" />} placeholder="请输入用户名"></Input>
                               )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        },
                                        {
                                            min: 6,
                                            max: 15,
                                            message: '密码长度必须为6-15位'
                                        },
                                        {
                                            pattern: new RegExp('^\\w+$', 'g'),
                                            message: '密码必须为数字、字母或_'
                                        }
                                    ]
                                })(
                                    <Input type="password" prefix={<Icon type="lock" />} placeholder="请输入密码"></Input>
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '1'
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: '18'
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>
                        <FormItem label="状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '2'
                                })(
                                    <Select>
                                        <Option value="1">咸鱼一枚</Option>
                                        <Option value="2">北大才子</Option>
                                        <Option value="3">风华浪子</Option>
                                        <Option value="4">企鹅Vip</Option>
                                        <Option value="5">女装大佬</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: ['2', '3']
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">游泳</Option>
                                        <Option value="2">爬山</Option>
                                        <Option value="3">看书</Option>
                                        <Option value="4">做饭</Option>
                                        <Option value="5">唱歌</Option>
                                        <Option value="6">骑行</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="婚否" {...formItemLayout}>
                            {
                                getFieldDecorator('married', {
                                    valuePropName: 'checked',
                                    initialValue: false
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2018-08-08 12:00:59')
                                })(
                                    <DatePicker 
                                        format="YYYY-MM-DD HH:mm:ss"
                                        showTime    
                                    ></DatePicker>
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '北京市海淀区奥林匹克公园'
                                })(
                                    <TextArea 
                                        autosize={
                                            {
                                                minRows: 3,
                                                maxRows: 6
                                            }
                                        }
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('getUpTime')(
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg ? <img src={this.state.userImg} alt=""/> : <Icon type="plus" />}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('read', {
                                    valuePropName: 'cheked',
                                    initialValue: true
                                })(
                                    <Checkbox defaultChecked>我已阅读过<a href="javascript:;">Imooc协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button onClick={this.handleRegist}>
                                注册
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

FormRegist = Form.create()(FormRegist)
export default FormRegist