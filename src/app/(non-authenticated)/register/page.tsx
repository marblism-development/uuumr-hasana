'use client'
import { Api } from '@/core/trpc'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { Header } from '../components/Header'

const { Text } = Typography

export default function RegisterPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()

  const { mutateAsync: registerUser, isLoading } = Api.user.create.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      await registerUser({ data: values })
      signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/home',
      })
    } catch (error) {
      enqueueSnackbar(`${error}`, {
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
        <Header description="Welcome!" />

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input type="email" placeholder="Your email" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Name is required' }]}
            label="Name"
          >
            <Input placeholder="Your name" />
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
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => router.push('/login')}
        >
          <Flex gap={'small'} justify="center">
            <Text type="secondary">Have an account?</Text> <Text>Sign in</Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
