'use client'

import { useState } from 'react'
import { Typography, Button, Form, Input, List, Spin, Row, Col, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function ProjectsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [isCreating, setIsCreating] = useState(false)

  const { data: projects, isLoading: isLoadingProjects } = Api.project.findMany.useQuery({ include: { tasks: true } })
  const { mutateAsync: createProject, isLoading: isCreatingProject } = Api.project.create.useMutation()

  const handleCreateProject = async (values: { name: string, description?: string }) => {
    try {
      await createProject({ data: values })
      enqueueSnackbar('Project created successfully', { variant: 'success' })
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to create project', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={2}>Projects</Title>
          <Paragraph>Manage your projects and tasks efficiently</Paragraph>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Card>
            <Form form={form} layout="vertical" onFinish={handleCreateProject}>
              <Form.Item
                name="name"
                label="Project Name"
                rules={[{ required: true, message: 'Please enter the project name' }]}
              >
                <Input placeholder="Enter project name" />
              </Form.Item>
              <Form.Item name="description" label="Project Description">
                <Input.TextArea placeholder="Enter project description" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isCreatingProject}>
                  Create Project
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={18}>
          {isLoadingProjects ? (
            <Spin size="large" />
          ) : (
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={projects}
              renderItem={project => (
                <List.Item>
                  <Card
                    title={project.name}
                    extra={<Button type="link" onClick={() => router.push(`/projects/${project.id}`)}>View</Button>}
                  >
                    <p>{project.description}</p>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
    </PageLayout>
  )
}