import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Dropdown, List, Menu, Row, Select, Tooltip, Form } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'umi';
import numeral from 'numeral';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const { Option } = Select;
export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';
  let result = val;

  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }

  return result;
}
const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const CardInfo = ({ activeUser, newUser }) => (
  <div className={styles.cardInfo}>
    <div>
      <p>active user</p>
      <p>{activeUser}</p>
    </div>
    <div>
      <p>New users</p>
      <p>{newUser}</p>
    </div>
  </div>
);

export const Applications = props => {
  const {
    dispatch,
    loading,
    listAndsearchAndapplications: { list },
  } = props;
  useEffect(() => {
    dispatch({
      type: 'listAndsearchAndapplications/fetch',
      payload: {
        count: 8,
      },
    });
  }, [1]);

  const handleValuesChange = () => {
    dispatch({
      type: 'listAndsearchAndapplications/fetch',
      payload: {
        count: 8,
      },
    });
  };

  const itemMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
          3d menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.filterCardList}>
      <Card bordered={false}>
        <Form onValuesChange={handleValuesChange}>
          <StandardFormRow
            title="Affiliation"
            block
            style={{
              paddingBottom: 11,
            }}
          >
            <Form.Item name="category">
              <TagSelect expandable>
              <TagSelect.Option value = "cat1"> Category one </TagSelect.Option>
                <TagSelect.Option value = "cat2"> Category 2 </TagSelect.Option>
                <TagSelect.Option value = "cat3"> Category three </TagSelect.Option>
                <TagSelect.Option value = "cat4"> Category 4 </TagSelect.Option>
                <TagSelect.Option value = "cat5"> Category five </TagSelect.Option>
                <TagSelect.Option value = "cat6"> Category VI </TagSelect.Option>
                <TagSelect.Option value = "cat7"> Category seven </TagSelect.Option>
                <TagSelect.Option value = "cat8"> Category eight </TagSelect.Option>
                <TagSelect.Option value = "cat9"> Category nine </TagSelect.Option>
                <TagSelect.Option value = "cat10"> Category ten </TagSelect.Option>
                <TagSelect.Option value = "cat11"> Category eleven </TagSelect.Option>
                <TagSelect.Option value = "cat12"> Category 12 </TagSelect.Option>
              </TagSelect>
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow title="Other options" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="author" label="Author">
                  <Select
                    placeholder="Unlimited"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="lisa">Wang Zhaojun</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="rate" label="Praise of">
                  <Select
                    placeholder="Unlimited"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value="good">good</Option>
                    <Option value="normal">normal</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <br />
      <List
        rowKey="id"
        grid={{
          gutter: 24,
          xl: 4,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        loading={loading}
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{
                paddingBottom: 20,
              }}
              actions={[
                <Tooltip key="download" title="download">
                  <DownloadOutlined />
                </Tooltip>,
                <Tooltip key="edit" title="edit">
                  <EditOutlined />
                </Tooltip>,
                <Tooltip title="share" key="share">
                  <ShareAltOutlined />
                </Tooltip>,
                <Dropdown key="ellipsis" overlay={itemMenu}>
                  <EllipsisOutlined />
                </Dropdown>,
              ]}
            >
              <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
              <div className={styles.cardItemContent}>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={numeral(item.newUser).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default connect(({ listAndsearchAndapplications, loading }) => ({
  listAndsearchAndapplications,
  loading: loading.models.listAndsearchAndapplications,
}))(Applications);
