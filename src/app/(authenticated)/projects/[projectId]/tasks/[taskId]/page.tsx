'use client'

import { useState } from 'react'
import { Typography, Form, Input, Button, DatePicker, Select, Upload, List, Comment, Avatar, Space, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, UploadOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function TaskDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()

  const { data: task, isLoading } = Api.task.findFirst.useQuery({ where: { id: params.taskId }, include: { assignedUser: true, comments: true, files: true } })
  const { data: users } = Api.user.findMany.useQuery({ include: { tasksAsAssignedUser: true } })
  const { mutateAsync: updateTask } = Api.task.update.useMutation()
  const { mutateAsync: deleteTask } = Api.task.delete.useMutation()
  const { mutateAsync: createComment } = Api.comment.create.useMutation()
  const { mutateAsync: uploadFile } = useUploadPublic()

  const handleEdit = async (values: any) => {
    try {
      await updateTask({ where: { id: params.taskId }, data: values })
      enqueueSnackbar('Task updated successfully', { variant: 'success' })
      setIsEditing(false)
    } catch (error) {
      enqueueSnackbar('Failed to update task', { variant: 'error' })
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTask({ where: { id: params.taskId } })
      enqueueSnackbar('Task deleted successfully', { variant: 'success' })
      router.push(`/projects/${params.projectId}/tasks`)
    } catch (error) {
      enqueueSnackbar('Failed to delete task', { variant: 'error' })
    }
  }

  const handleCommentSubmit = async (values: any) => {
    try {
      await createComment({ data: { ...values, taskId: params.taskId, userId: user.id } })
      enqueueSnackbar('Comment added successfully', { variant: 'success' })
      form.resetFields(['comment'])
    } catch (error) {
      enqueueSnackbar('Failed to add comment', { variant: 'error' })
    }
  }

  const handleFileUpload = async (file: any) => {
    try {
      const { url } = await uploadFile({ file })
      await Api.file.create.useMutation()({ data: { fileUrl: url, taskId: params.taskId } })
      enqueueSnackbar('File uploaded successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to upload file', { variant: 'error' })
    }
  }

  if (isLoading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Task Details</Title>
      <Paragraph>View and manage the details of the task below.</Paragraph>
      {isEditing ? (
        <Form form={form} onFinish={handleEdit} initialValues={{ ...task, deadline: dayjs(task.deadline) }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the task name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="deadline" label="Deadline">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name="assignedUserId" label="Assign to">
            <Select>
              {users?.map(user => (
                <Option key={user.id} value={user.id}>{user.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button onClick={() => setIsEditing(false)} style={{ marginLeft: '8px' }}>Cancel</Button>
          </Form.Item>
        </Form>
      ) : (
        <div>
          <Title level={4}>{task.name}</Title>
          <Paragraph>{task.description}</Paragraph>
          <Text strong>Deadline:</Text> <Text>{dayjs(task.deadline).format('YYYY-MM-DD HH:mm')}</Text><br />
          <Text strong>Assigned to:</Text> <Text>{task.assignedUser?.name || 'Unassigned'}</Text><br />
          <Text strong>Status:</Text> <Text>{task.status}</Text><br />
          <Space>
            <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>Edit</Button>
            <Popconfirm title="Are you sure to delete this task?" onConfirm={handleDelete} okText="Yes" cancelText="No">
              <Button icon={<DeleteOutlined />} danger>Delete</Button>
            </Popconfirm>
          </Space>
        </div>
      )}
      <Divider />
      <Title level={4}>Comments</Title>
      <Form form={form} onFinish={handleCommentSubmit}>
        <Form.Item name="comment" rules={[{ required: true, message: 'Please input your comment!' }]}>
          <Input.TextArea rows={4} placeholder="Add a comment" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>Add Comment</Button>
        </Form.Item>
      </Form>
      <List
        dataSource={task.comments}
        renderItem={(comment: any) => (
          <Comment
            author={comment.user?.name}
            avatar={<Avatar>{comment.user?.name?.[0]}</Avatar>}
            content={comment.content}
            datetime={dayjs(comment.dateCreated).format('YYYY-MM-DD HH:mm')}
          />
        )}
      />
      <Divider />
      <Title level={4}>Files</Title>
      <Upload customRequest={({ file }) => handleFileUpload(file)} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload File</Button>
      </Upload>
      <List
        dataSource={task.files}
        renderItem={(file: any) => (
          <List.Item>
            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">{file.fileUrl}</a>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}