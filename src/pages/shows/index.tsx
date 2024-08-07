import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { IShow } from "../../models/showModel";
import { useResource } from "react-request-hook";
import { showService } from "../../services/showService";
import { ConfirmationModal } from "../../components/modals/confirmationModal";

const ShowsList = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_: any, { tags }: any) => (
        <>
          {tags.map((tag: string) => {
            return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <VisibilityOutlinedIcon />
          <DeleteOutlinedIcon
            color="error"
            onClick={() => setIsDeleting(record)}
          />
        </Space>
      ),
    },
  ];
  const dummyData = [
    {
      key: "1",
      name: "One Piece",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus vel metus et maximus.",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Stranger Things",
      description:
        "Sed eget malesuada nibh. Nam gravida a odio sit amet feugiat. Vivamus eu porta metus. Aliquam massa metus, feugiat id purus eu, lacinia condimentum eros",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Peaky Blinders",
      description:
        "Aliquam eu aliquam mauris, et pulvinar eros. Cras vitae placerat ipsum",
      tags: ["cool", "teacher"],
    },
  ];

  const [isDeleting, setIsDeleting] = useState<IShow>();
  const [showResponse, getShows] = useResource(showService.getUserShows);

  const handleClose = (reload?: boolean) => {
    if (reload === true) {
      getShows();
    }
  };

  useEffect(() => {
    getShows();
  }, []);

  return (
    <>
      <Grid container={true} item={true} xs={12}>
        <Card style={{ width: "100%" }}>
          <CardHeader title="TV Shows List"></CardHeader>
          <CardContent>
            <Table columns={columns} dataSource={dummyData} />
          </CardContent>
        </Card>
      </Grid>
      {isDeleting && (
        <ConfirmationModal show={isDeleting} handleClose={handleClose} />
      )}
    </>
  );
};
export default ShowsList;
