import Pagina from "../../Components/Pagina";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Alert, Card, Badge } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillSave, AiOutlineDoubleLeft } from "react-icons/ai";
import { mask } from "remask";
import { DataGrid } from "@mui/x-data-grid";

const FormPassagem = () => {
  const { push, query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [voos, setVoos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [aeroportos, setAeroportos] = useState([]);
  const [aeronaves, setAeronaves] = useState([]);
  const [voosFiltrados, setVoosFiltrados] = useState([]);
  const [vooSelecionado, setVooSelecionado] = useState(null);
  const [aeronaveAtiva, setAeronaveAtiva] = useState(null);

  const origemWatch = watch("origem");
  const destinoWatch = watch("destino");

  useEffect(() => {
    const voosSalvos = JSON.parse(window.localStorage.getItem("voos")) || [];
    const usersSalvos =
      JSON.parse(window.localStorage.getItem("cadastros")) || [];
    const aerosSalvos =
      JSON.parse(window.localStorage.getItem("aeroportos")) || [];
    const aeronavesSalvas =
      JSON.parse(window.localStorage.getItem("aeronaves")) || [];

    setVoos(voosSalvos);
    setUsuarios(usersSalvos);
    setAeroportos(aerosSalvos);
    setAeronaves(aeronavesSalvas);
  }, []);

  useEffect(() => {
    if (origemWatch && destinoWatch) {
      const filtrados = voos.filter(
        (v) => v.origem === origemWatch && v.destino === destinoWatch,
      );
      setVoosFiltrados(filtrados);
    }
  }, [origemWatch, destinoWatch, voos]);

  useEffect(() => {
    if (vooSelecionado) {
      const aeroOrigem = aeroportos.find(
        (a) =>
          a.nome === vooSelecionado.origem || a.sigla === vooSelecionado.origem,
      );
      const dadosAero = aeronaves.find((a) => a.nome === aeroOrigem?.aeronave);
      setAeronaveAtiva(dadosAero || null);
    }
  }, [vooSelecionado, aeroportos, aeronaves]);

  const columns = [
    { field: "nome_id", headerName: "Voo", width: 90 },
    { field: "companhia_aerea", headerName: "Companhia", width: 130 },
    { field: "horario_embarque", headerName: "Partida", width: 100 },
    { field: "data", headerName: "Data", width: 110 },
  ];

  const salvar = (dados) => {
    if (!vooSelecionado) return alert("Selecione um voo na tabela!");
    const passagens =
      JSON.parse(window.localStorage.getItem("passagens")) || [];
    const novaPassagem = { ...dados, ...vooSelecionado };
    passagens.push(novaPassagem);
    window.localStorage.setItem("passagens", JSON.stringify(passagens));
    push("/passagem");
  };

  return (
    <Pagina titulo="Reserva de Passagem" typeNavBar="usuario">
      <Form className="mt-3">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card
              className="mb-4 shadow-sm border-0"
              style={{ background: "#1a1a1a", color: "white" }}
            >
              <Card.Body>
                <h5 className="text-info mb-3">1. Seleção de Rota e Voo</h5>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Passageiro:</Form.Label>
                      <Form.Select
                        isInvalid={!!errors.nome2}
                        {...register("nome2", {
                          required: "Selecione o passageiro",
                        })}
                      >
                        <option value="">Quem vai viajar?</option>
                        {usuarios.map((u) => (
                          <option key={u.cpf} value={u.nome}>
                            {u.nome}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.nome2?.message}
                      </Form.Control.Feedback>
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
                    height: 220,
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
                  />
                </div>
              </Card.Body>
            </Card>

            <Card className="p-4 shadow-sm border-0">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Classe:</Form.Label>
                    <Form.Select
                      {...register("classe", {
                        required: "Selecione a classe",
                      })}
                    >
                      <option value="">Selecione a classe...</option>
                      <option value="Econômica">Econômica</option>
                      <option value="Executiva">Executiva</option>
                      <option value="Primeira Classe">Primeira Classe</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Assento (Ex: 12A):</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Digite o número e letra"
                      isInvalid={!!errors.assento}
                      {...register("assento", {
                        required: "Informe o assento",
                        pattern: {
                          value: /^[0-9]{1,2}[A-Z]{1}$/,
                          message: "Formato inválido. Ex: 12A",
                        },
                      })}
                      onChange={(e) =>
                        setValue(
                          "assento",
                          mask(e.target.value.toUpperCase(), "99A"),
                        )
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.assento?.message}
                    </Form.Control.Feedback>

                    {aeronaveAtiva && (
                      <Form.Text className="text-muted">
                        Aeronave: <strong>{aeronaveAtiva.nome}</strong> |
                        Fileiras: 1-{aeronaveAtiva.fileiras}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {vooSelecionado && (
                <Alert
                  variant="info"
                  className="mt-3 py-2 d-flex justify-content-between align-items-center"
                >
                  <span>
                    Voo: <strong>{vooSelecionado.nome_id}</strong> (
                    {vooSelecionado.origem} ➔ {vooSelecionado.destino})
                  </span>
                  <Badge bg="dark">Selecionado</Badge>
                </Alert>
              )}

              <div className="text-center mt-4">
                <Link className="btn btn-outline-warning me-2" href="/passagem">
                  <AiOutlineDoubleLeft /> Voltar
                </Link>
                <Button variant="info" onClick={handleSubmit(salvar)}>
                  <AiFillSave className="me-2" /> Finalizar Reserva
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </Pagina>
  );
};

export default FormPassagem;
