import React from 'react'
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd'
import './index.less'

const FormItem = Form.Item

class FormLogin extends React.Component {
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`
                    ${userInfo.userName} 恭喜你，通过校验!
                `)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名"></Input>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入用密码"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" style={{ marginTop: 16 }}>
                    <Form style={{ width: 300 }}>
                    <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        },
                                        {
                                            min: 6, max: 15,
                                            message: '长度必须为6-15个字符之间'
                                        },
                                        {
                                            pattern: new RegExp('^\\w+$', 'g'),
                                            message: '必须为字母、数字或_'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"></Icon>} placeholder="请输入用户名"></Input>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        },
                                        {
                                            min: 6, max: 15,
                                            message: '长度必须为6-15个字符之间'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type='lock' />} placeholder="请输入密码"></Input>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
FormLogin = Form.create()(FormLogin)
export default FormLogin
