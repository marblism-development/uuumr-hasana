'use client'

import { Typography, Button, List, Card, Space, Modal, Form, Input, Row, Col } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function ProjectDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const projectId = params.projectId

  const { data: project, isLoading: projectLoading } = Api.project.findFirst.useQuery({ where: { id: projectId }, include: { tasks: true, teamMembers: { include: { user: true } } } })
  const { mutateAsync: updateProject } = Api.project.update.useMutation()
  const { mutateAsync: deleteProject } = Api.project.delete.useMutation()
  const { mutateAsync: createTeamMember } = Api.teamMember.create.useMutation()
  const { mutateAsync: deleteTeamMember } = Api.teamMember.delete.useMutation()
  const { data: users } = Api.user.findMany.useQuery()

  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false)
  const [editForm] = Form.useForm()
  const [inviteForm] = Form.useForm()

  const handleEditProject = async (values: any) => {
    try {
      await updateProject({ where: { id: projectId }, data: values })
      enqueueSnackbar('Project updated successfully', { variant: 'success' })
      setIsEditModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to update project', { variant: 'error' })
    }
  }

  const handleDeleteProject = async () => {
    try {
      await deleteProject({ where: { id: projectId } })
      enqueueSnackbar('Project deleted successfully', { variant: 'success' })
      router.push('/projects')
    } catch (error) {
      enqueueSnackbar('Failed to delete project', { variant: 'error' })
    }
  }

  const handleInviteMember = async (values: any) => {
    try {
      await createTeamMember({ data: { projectId, userId: values.userId } })
      enqueueSnackbar('Team member invited successfully', { variant: 'success' })
      setIsInviteModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to invite team member', { variant: 'error' })
    }
  }

  const handleRemoveMember = async (teamMemberId: string) => {
    try {
      await deleteTeamMember({ where: { id: teamMemberId } })
      enqueueSnackbar('Team member removed successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to remove team member', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <Title level={2}>Project Details</Title>
          <Paragraph>View and manage the details of your project, including tasks, deadlines, and team members.</Paragraph>

          <Card loading={projectLoading} title={project?.name} extra={
            <Space>
              <Button icon={<EditOutlined />} onClick={() => { setIsEditModalVisible(true); editForm.setFieldsValue(project) }}>Edit</Button>
              <Button icon={<DeleteOutlined />} danger onClick={handleDeleteProject}>Delete</Button>
            </Space>
          }>
            <Paragraph>{project?.description}</Paragraph>
            <Text strong>Deadline: </Text><Text>{project?.deadline}</Text>
          </Card>

          <Title level={3}>Tasks</Title>
          <List
            loading={projectLoading}
            dataSource={project?.tasks}
            renderItem={task => (
              <List.Item>
                <Card title={task.name}>
                  <Text>{task.description}</Text>
                  <br />
                  <Text strong>Status: </Text><Text>{task.status}</Text>
                  <br />
                  <Text strong>Deadline: </Text><Text>{task.deadline}</Text>
                </Card>
              </List.Item>
            )}
          />

          <Title level={3}>Team Members</Title>
          <Button icon={<UserAddOutlined />} type="primary" onClick={() => setIsInviteModalVisible(true)}>Invite Member</Button>
          <List
            loading={projectLoading}
            dataSource={project?.teamMembers}
            renderItem={teamMember => (
              <List.Item actions={[<Button icon={<UserDeleteOutlined />} danger onClick={() => handleRemoveMember(teamMember.id)}>Remove</Button>]}>
                <List.Item.Meta title={teamMember.user?.name} description={teamMember.user?.email} />
              </List.Item>
            )}
          />
        </Col>
      </Row>

      <Modal title="Edit Project" visible={isEditModalVisible} onCancel={() => setIsEditModalVisible(false)} onOk={() => editForm.submit()}>
        <Form form={editForm} onFinish={handleEditProject}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the project name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Invite Team Member" visible={isInviteModalVisible} onCancel={() => setIsInviteModalVisible(false)} onOk={() => inviteForm.submit()}>
        <Form form={inviteForm} onFinish={handleInviteMember}>
          <Form.Item name="userId" label="User" rules={[{ required: true, message: 'Please select a user!' }]}>
            <Input.Select>
              {users?.map(user => (
                <Input.Select.Option key={user.id} value={user.id}>{user.name}</Input.Select.Option>
              ))}
            </Input.Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}