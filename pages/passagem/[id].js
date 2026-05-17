import Pagina from "../../Components/Pagina";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillSave, AiOutlineDoubleLeft } from "react-icons/ai";
import passagemValidator from "../../validators/passagemValidator";
import { mask } from "remask";
import { DataGrid } from "@mui/x-data-grid";

const FormEdicaoPassagem = () => {
  const { push, query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [usuarios, setUsuarios] = useState([]);
  const [voos, setVoos] = useState([]);
  const [voosFiltrados, setVoosFiltrados] = useState([]);
  const [vooSelecionado, setVooSelecionado] = useState(null);

  const origemWatch = watch("origem");
  const destinoWatch = watch("destino");

  useEffect(() => {
    setUsuarios(JSON.parse(window.localStorage.getItem("cadastros")) || []);
    const voosSalvos = JSON.parse(window.localStorage.getItem("voos")) || [];
    setVoos(voosSalvos);

    if (query.id) {
      const passagens =
        JSON.parse(window.localStorage.getItem("passagens")) || [];
      const passagem = passagens[query.id];
      if (passagem) {
        Object.keys(passagem).forEach((key) => setValue(key, passagem[key]));
        setVooSelecionado(passagem);
      }
    }
  }, [query.id, setValue]);

  useEffect(() => {
    if (origemWatch && destinoWatch) {
      const filtrados = voos.filter(
        (v) => v.origem === origemWatch && v.destino === destinoWatch,
      );
      setVoosFiltrados(filtrados);
    }
  }, [origemWatch, destinoWatch, voos]);

  function salvar(dados) {
    const passagens =
      JSON.parse(window.localStorage.getItem("passagens")) || [];

    const passagemAtualizada = { ...dados, ...vooSelecionado };

    passagens.splice(query.id, 1, passagemAtualizada);
    window.localStorage.setItem("passagens", JSON.stringify(passagens));
    push("/passagem");
  }

  const columns = [
    { field: "companhia_aerea", headerName: "Companhia", width: 130 },
    { field: "nome_id", headerName: "Voo", width: 100 },
    { field: "data", headerName: "Data", width: 110 },
    { field: "horario_embarque", headerName: "Embarque", width: 100 },
  ];

  return (
    <Pagina titulo="Editar Passagem" typeNavBar="usuario">
      <Form className="mt-3">
        <Card
          className="mb-4 shadow-sm border-0"
          style={{ background: "#1a1a1a", color: "white" }}
        >
          <Card.Body>
            <h5 className="text-info mb-3">Dados do Voo</h5>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Passageiro:</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.nome2}
                    {...register("nome2", { required: "Obrigatório" })}
                  >
                    <option value="">Selecione o passageiro</option>
                    {usuarios.map((u) => (
                      <option key={u.cpf} value={u.nome}>
                        {u.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Origem:</Form.Label>
                  <Form.Select {...register("origem")}>
                    <option value="">Origem</option>
                    {[...new Set(voos.map((v) => v.origem))].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Destino:</Form.Label>
                  <Form.Select {...register("destino")}>
                    <option value="">Destino</option>
                    {[...new Set(voos.map((v) => v.destino))].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div
              style={{
                height: 200,
                width: "100%",
                background: "#fff",
                borderRadius: "5px",
              }}
            >
              <DataGrid
                rows={voosFiltrados}
                columns={columns}
                getRowId={(r) => r.nome_id + r.data + r.horario_embarque}
                onRowClick={(p) => setVooSelecionado(p.row)}
                pageSizeOptions={[5]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
              />
            </div>
          </Card.Body>
        </Card>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Classe:</Form.Label>
              <Form.Select {...register("classe", { required: "Obrigatório" })}>
                <option value="Econômica">Econômica</option>
                <option value="Executiva">Executiva</option>
                <option value="Primeira Classe">Primeira Classe</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Assento (Número + Letra):</Form.Label>
              <Form.Control
                isInvalid={!!errors.assento}
                type="text"
                placeholder="Ex: 14B"
                {...register("assento", {
                  required: "Informe o assento",
                  pattern: {
                    value: /^[0-9]{1,2}[A-Z]{1}$/,
                    message: "Formato inválido (Ex: 12A)",
                  },
                })}
                onChange={(e) =>
                  setValue("assento", mask(e.target.value.toUpperCase(), "99A"))
                }
              />
              {errors.assento && (
                <small className="text-danger">{errors.assento.message}</small>
              )}
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Link className="btn btn-outline-warning" href="/passagem">
            <AiOutlineDoubleLeft className="me-2" /> Voltar
          </Link>
          <Button
            className="ms-2"
            variant="info"
            onClick={handleSubmit(salvar)}
          >
            <AiFillSave className="me-2" /> Atualizar Passagem
          </Button>
        </div>
      </Form>
    </Pagina>
  );
};

export default FormEdicaoPassagem;
