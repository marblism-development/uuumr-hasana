'use client'

import { Authentication } from '@/core/authentication'
import { Configuration } from '@/core/configuration'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
const { Text } = Typography

export default function LoginPage() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const error = searchParams.get('error')

  const [isLoading, setIsLoading] = useState(false)

  const errorMessages: { [key: string]: string } = {
    Signin: 'Try signing in with a different account.',
    OAuthSignin: 'Try signing in with a different account.',
    OAuthCallback: 'Try signing in with a different account.',
    OAuthCreateAccount: 'Try signing in with a different account.',
    EmailCreateAccount: 'Try signing in with a different account.',
    Callback: 'Try signing in with a different account.',
    OAuthAccountNotLinked:
      'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin:
      'Sign in failed. Check the details you provided are correct.',
    default: 'Unable to sign in.',
  }

  const errorMessage = errorMessages[error ?? 'default']

  const [form] = Form.useForm()

  const initialValues = { email: null, password: null }

  const urlAfterLogin = '/home'

  const handleLoginCredentials = async (values: any) => {
    setIsLoading(true)

    signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: urlAfterLogin,
    })
  }

  const handleLoginProvider = async (id: string) => {
    signIn(id, {
      callbackUrl: urlAfterLogin,
    })
  }

  useEffect(() => {
    if (Configuration.isDevelopment) {
      form.setFieldValue('email', 'test@test.com')
      form.setFieldValue('password', 'password')
    }
  }, [])

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
          <Header description="Welcome!" />

          {error && <p style={{ color: 'red' }}>{errorMessage}</p>}

          {Authentication.providers.map(
            provider =>
              provider?.id !== 'credentials' &&
              provider.active === true && (
                <Button
                  key={provider.id}
                  onClick={() => handleLoginProvider(provider.id)}
                  style={{ width: '100%' }}
                >
                  Login with {provider.name}
                </Button>
              ),
          )}

          <Form
            form={form}
            onFinish={handleLoginCredentials}
            layout="vertical"
            initialValues={initialValues}
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

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input.Password
                type="password"
                placeholder="Your password"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <Flex justify="end">
                <Button
                  type="link"
                  onClick={() => router.push('/reset-password')}
                  style={{ padding: 0, margin: 0 }}
                >
                  Forgot password?
                </Button>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <Button
            ghost
            style={{ border: 'none' }}
            onClick={() => router.push('/register')}
          >
            <Flex gap={'small'} justify="center">
              <Text type="secondary">No account?</Text> <Text>Sign up</Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
