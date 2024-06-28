'use client'

import { Typography, Row, Col, Card, List, Badge, Spin } from 'antd'
import { ProjectOutlined, NotificationOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: userData, isLoading: userLoading } = Api.user.findFirst.useQuery({
    where: { id: user?.id },
    include: {
      tasksAsAssignedUser: true,
      notifications: true,
    },
  })

  if (userLoading) {
    return (
      <PageLayout layout="full-width">
        <Spin tip="Loading...">
          <div style={{ minHeight: '100vh' }} />
        </Spin>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Dashboard</Title>
      <Paragraph>Overview of all your projects and tasks to quickly assess your workload and progress.</Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Projects" bordered={false} extra={<ProjectOutlined />}>
            <List
              dataSource={userData?.tasksAsAssignedUser?.map(task => task.project) || []}
              renderItem={project => (
                <List.Item>
                  <List.Item.Meta
                    title={project?.name}
                    description={project?.description}
                    onClick={() => router.push(`/projects/${project?.id}`)}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Notifications" bordered={false} extra={<NotificationOutlined />}>
            <List
              dataSource={userData?.notifications || []}
              renderItem={notification => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Badge
                        status={notification.readStatus ? 'default' : 'processing'}
                        text={notification.content}
                      />
                    }
                    description={dayjs(notification.dateCreated).format('YYYY-MM-DD HH:mm')}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}