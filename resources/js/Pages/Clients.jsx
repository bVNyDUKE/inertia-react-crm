import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/CRM/Table";
import Modal from "@/Components/CRM/Modal";
import Button from "@/Components/CRM/Button";
import Pagination from "@/Components/CRM/Pagination";
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
    <Modal title={"Add Client"} ref={ref} afterLeave={afterLeave}>
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

export default function Clients({ auth, errors, clients }) {
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
    <Authenticated auth={auth} errors={errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clients</h2>}>
      <Head title="Clients" />

      <div className="p-8 lg:px-14">
        <div className="mx-auto">
          <ClientModal errors={errors} form={modalForm} submit={modalSubmit} isEditing={isEditing} setisEditing={setisEditing} />

          <div className="bg-white shadow-sm">
            <Table.Main title="Client List">
              <Table.Head headers={["Company", "VAT", "Address", ""]} />
              <Table.Body>
                {clients.data.map((client, index) => (
                  <Table.Row key={client.id} stripped={index % 2 === 0}>
                    <Table.Cell data={client.company} />
                    <Table.Cell data={client.vat} />
                    <Table.Cell data={client.address} />
                    <Table.Cell>
                      {" "}
                      <Button label="Edit" onClick={() => openEditModal(client)} />{" "}
                      <Button color="red" label="Delete" onClick={() => createForm.destroy(route("clients.destroy", client.id))} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Main>
            <Pagination paginator={clients} />
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
