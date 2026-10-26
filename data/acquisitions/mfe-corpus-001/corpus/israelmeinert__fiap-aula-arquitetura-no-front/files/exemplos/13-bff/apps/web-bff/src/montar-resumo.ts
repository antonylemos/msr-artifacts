export type Consultas = { evento: () => Promise<{ id: string; titulo: string }>; vagas: () => Promise<number> };
export async function montarResumo(api: Consultas) {
  const [evento, vagas] = await Promise.all([api.evento(), api.vagas()]);
  // Política explícita: a falha de qualquer consulta faz a operação inteira falhar.
  return { id: evento.id, titulo: evento.titulo, disponivel: vagas > 0 };
}
