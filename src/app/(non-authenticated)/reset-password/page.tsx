'use client'
import { Api } from '@/core/trpc'
import { Alert, Button, Flex, Form, Input, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Header } from '../components/Header'

const { Text } = Typography

export default function ResetPasswordPage() {
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const [email, setEmail] = useState<string>()

  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const [form] = Form.useForm()

  const { mutateAsync: resetPassword, isLoading } =
    Api.auth.sendResetPasswordEmail.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      setEmail(values.email)
      await resetPassword({ email: values.email })
      setIsSuccess(true)
    } catch (error) {
      enqueueSnackbar(`Could not reset password: ${error}`, {
        variant: 'error',
      })
    }
  }

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{ width: '340px', paddingBottom: '100px', paddingTop: '100px' }}
        gap="middle"
      >
        <Header description="You will receive a verification code" />

        {isSuccess && (
          <Alert
            style={{ textAlign: 'center' }}
            message={`We sent an email to ${email} with a link to reset your password`}
            type="success"
          />
        )}

        {!isSuccess && (
          <>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email is required' }]}
              >
                <Input
                  type="email"
                  placeholder="Your email"
                  autoComplete="email"
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
          </>
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
  )
}
