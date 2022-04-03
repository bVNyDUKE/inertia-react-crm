import React from "react";
import { Link, useForm } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/Table";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import PageTitle from "@/Components/PageTitle";
import Input from "@/Components/Breeze/Input";
import Label from "@/Components/Breeze/Label";
import ValidationErrors from "@/Components/Breeze/ValidationErrors";
import { default as ButtonBlack } from "@/Components/Breeze/Button";

const ClientModal = ({ form, errors, submit, isEditing, setisEditing }) => {
  const ref = React.useRef(null);

  React.useEffect(() => isEditing && ref.current.showModal(), [isEditing]);

  const onSubmit = (e) => {
    e.preventDefault();
    submit(e);
    ref.current.hideModal();
  };

  const handleInputChange = (e) => {
    form.setData(e.target.name, e.target.value);
  };

  const afterLeave = () => {
    form.reset(...Object.keys(form.data));
    setisEditing(false);
  };

  return (
    <Modal title={isEditing ? "Edit Client" : "Add Client"} buttonTitle="Add Client" ref={ref} afterLeave={afterLeave}>
      <div className="border-t border-gray-300">
        <form className="space-y-2" onSubmit={onSubmit}>
          <ValidationErrors errors={errors} />
          <Label forInput={"company"}>Company</Label>
          <Input name={"company"} value={form.data.company} required={true} handleChange={handleInputChange} className={"w-full"} />
          <Label forInput={"vat"}>VAT</Label>
          <Input name={"vat"} value={form.data.vat} required={true} handleChange={handleInputChange} className={"w-full"} />
          <Label forInput={"address"}>Address</Label>
          <Input name={"address"} value={form.data.address} required={true} handleChange={handleInputChange} className={"w-full"} />
          <ButtonBlack className={form.processing ?? "disabled"}>Submit</ButtonBlack>
        </form>
      </div>
    </Modal>
  );
};

const Clients = ({ errors, clients }) => {
  const [isEditing, setisEditing] = React.useState(false);

  const createForm = useForm({ company: "", vat: "", address: "" });
  const editForm = useForm({});

  const [modalForm, setModalForm] = React.useState(createForm);
  const [modalSubmit, setModalSubmit] = React.useState("");

  React.useEffect(() => {
    if (isEditing) {
      setModalForm(editForm);
      setModalSubmit(() => updateClient);
      return;
    }

    setModalForm(createForm);
    setModalSubmit(() => addClient);
  }, [isEditing, editForm.data, createForm.data]);

  const openEditModal = (client) => {
    editForm.setData({
      id: client.id,
      company: client.company,
      vat: client.vat,
      address: client.address,
    });
    setisEditing(true);
  };

  const addClient = () => {
    createForm.post(route("clients.store"), {
      preserveScroll: true,
    });
  };

  const updateClient = () => {
    editForm.patch(route("clients.update", editForm.data.id), {
      preserveScroll: true,
    });
  };

  return (
    <>
      <PageTitle>Clients</PageTitle>
      <ClientModal errors={errors} form={modalForm} submit={modalSubmit} isEditing={isEditing} setisEditing={setisEditing} />

      <Table.Main paginator={clients}>
        <Table.Head>
          <Table.Th>Company</Table.Th>
          <Table.Th className={"text-right"}>VAT</Table.Th>
          <Table.Th className={"text-right"}>Address</Table.Th>
          <Table.Th></Table.Th>
        </Table.Head>
        <Table.Body>
          {clients.data.map((client) => (
            <Table.Row key={client.id}>
              <Table.Cell>
                <Link className="flex items-center px-6 py-4 focus:text-indigo-500" href="">
                  {client.company}
                </Link>
              </Table.Cell>
              <Table.Cell className="text-right">{client.vat}</Table.Cell>
              <Table.Cell className="text-right">{client.address}</Table.Cell>
              <Table.Cell className="pr-5 text-right">
                <Button label="Edit" onClick={() => openEditModal(client)} />{" "}
                <Button color="red" label="Delete" onClick={() => createForm.delete(route("clients.destroy", client.id))} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Main>
    </>
  );
};

Clients.layout = (page) => <Authenticated title="Clients">{page}</Authenticated>;

export default Clients;
