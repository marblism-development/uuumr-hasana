'use client'

import { useState } from 'react'
import { Typography, Input, Button, Select, List, Card, Row, Col, Spin } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function TasksPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskStatus, setTaskStatus] = useState('incomplete')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const { data: tasks, isLoading: tasksLoading } = Api.task.findMany.useQuery({
    include: { project: true },
    where: {
      projectId: params.projectId,
      ...(filterStatus !== 'all' && { status: filterStatus }),
      ...(searchTerm && { name: { contains: searchTerm } })
    }
  })

  const { data: projects, isLoading: projectsLoading } = Api.project.findMany.useQuery({
    include: { tasks: true },
    where: {
      ...(searchTerm && { name: { contains: searchTerm } })
    }
  })

  const { mutateAsync: createTask, isLoading: creatingTask } = Api.task.create.useMutation()

  const handleCreateTask = async () => {
    try {
      await createTask({
        data: {
          name: taskName,
          description: taskDescription,
          status: taskStatus,
          projectId: params.projectId
        }
      })
      enqueueSnackbar('Task created successfully', { variant: 'success' })
      setTaskName('')
      setTaskDescription('')
      setTaskStatus('incomplete')
    } catch (error) {
      enqueueSnackbar('Failed to create task', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Title level={2}>Task Management</Title>
          <Text>Manage your tasks within the project</Text>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search tasks or projects"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select
            defaultValue="all"
            style={{ width: '100%' }}
            onChange={(value) => setFilterStatus(value)}
          >
            <Option value="all">All</Option>
            <Option value="incomplete">Incomplete</Option>
            <Option value="complete">Complete</Option>
          </Select>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Task description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select
            defaultValue="incomplete"
            style={{ width: '100%' }}
            onChange={(value) => setTaskStatus(value)}
          >
            <Option value="incomplete">Incomplete</Option>
            <Option value="complete">Complete</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            loading={creatingTask}
            onClick={handleCreateTask}
          >
            Create Task
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24}>
          {tasksLoading || projectsLoading ? (
            <Spin size="large" />
          ) : (
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={tasks}
              renderItem={(task) => (
                <List.Item>
                  <Card title={task.name} extra={<Text>{task.status}</Text>}>
                    <Text>{task.description}</Text>
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