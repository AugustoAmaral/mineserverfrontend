export function describeDate(inputDate: Date): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const input = new Date(inputDate);
  input.setHours(0, 0, 0, 0);
  const dayInMillis = 24 * 60 * 60 * 1000;
  const diffDays = (now.getTime() - input.getTime()) / dayInMillis;

  if (diffDays === 0) {
    return "hoje";
  } else if (diffDays === 1) {
    return "ontem";
  } else if (diffDays === 2) {
    return "antes de ontem";
  } else if (diffDays < 7) {
    const weekDays = [
      "domingo",
      "segunda",
      "terça",
      "quarta",
      "quinta",
      "sexta",
      "sábado",
    ];
    return weekDays[input.getDay()];
  } else if (diffDays < 14) {
    return "semana passada";
  } else if (diffDays < 21) {
    return "duas semanas atrás";
  } else if (diffDays < 28) {
    return "três semanas atrás";
  } else if (diffDays < 60) {
    return "mês passado";
  } else if (diffDays < 365) {
    const monthsAgo = Math.ceil(diffDays / 30);
    return monthsAgo === 1 ? "mês passado" : `${monthsAgo} meses atrás`;
  } else if (diffDays < 730) {
    return "ano passado";
  } else {
    const yearsAgo = Math.ceil(diffDays / 365);
    return `${yearsAgo} anos atrás`;
  }
}
