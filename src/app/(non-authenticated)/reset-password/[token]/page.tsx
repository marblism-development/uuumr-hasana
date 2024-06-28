'use client'
import { Api } from '@/core/trpc'
import { Alert, Button, Flex, Form, Input, Typography } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Header } from '../../components/Header'

const { Text } = Typography

export default function ResetPasswordTokenPage() {
  const { token } = useParams<{ token: string }>()

  const [form] = Form.useForm()

  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const { mutateAsync: resetPassword, isLoading } =
    Api.auth.resetPassword.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      await resetPassword({ token, password: values.password })
      setIsSuccess(true)
    } catch (error) {
      enqueueSnackbar(`Could not reset password: ${error}`, {
        variant: 'error',
      })
    }
  }

  return (
    <>
      <Flex align="center" justify="center" vertical flex={1}>
        <Flex
          vertical
          style={{
            width: '340px',
            paddingBottom: '100px',
            paddingTop: '100px',
          }}
          gap="middle"
        >
          <Header description="Change your password" />

          {isSuccess && (
            <Alert type="success" message="Your password has been changed." />
          )}

          {!isSuccess && (
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password is required' }]}
              >
                <Input.Password
                  type="password"
                  placeholder="Your new password"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item
                label="Password confirmation"
                name="passwordConfirmation"
                rules={[
                  {
                    required: true,
                    message: 'Password confirmation is required',
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Password confirmation"
                  autoComplete="current-password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  block
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          )}

          <Flex justify="center" align="center">
            <Button
              ghost
              style={{ border: 'none' }}
              onClick={() => router.push('/login')}
            >
              <Flex gap={'small'} justify="center">
                <Text>Sign in</Text>
              </Flex>
            </Button>

            <Text type="secondary">or</Text>

            <Button
              ghost
              style={{ border: 'none' }}
              onClick={() => router.push('/register')}
            >
              <Flex gap={'small'} justify="center">
                <Text>Sign up</Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
