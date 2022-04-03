import React from "react";
import { Link } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/Table";
import PageTitle from "@/Components/PageTitle";

const ProjectsIndex = ({ projects }) => {
  return (
    <>
      <PageTitle>Projects</PageTitle>
      <div className="mb-4 flex items-center justify-between ">
        <div>Placeholder</div>
        <Link as={"button"} className="btn-indigo" href={route("projects.create")}>
          Create Project
        </Link>
      </div>

      <Table.Main paginator={projects}>
        <Table.Head>
          <Table.Th>Title</Table.Th>
          <Table.Th>User</Table.Th>
          <Table.Th>Client</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th></Table.Th>
        </Table.Head>
        <Table.Body>
          {projects.data.map((project) => (
            <Table.Row key={project.id}>
              <Table.Cell className="w-1/3">
                <Link className="flex items-center px-6 py-4 focus:text-indigo-500" href="">
                  {project.title}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link href="">{project.user.name}</Link>
              </Table.Cell>
              <Table.Cell>{project.client.company}</Table.Cell>
              <Table.Cell className="w-10 text-center">{project.status}</Table.Cell>
              <Table.Cell className="w-1/6 pr-5 text-right"></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Main>
    </>
  );
};

ProjectsIndex.layout = (page) => <Authenticated title="Projects">{page}</Authenticated>;

export default ProjectsIndex;
