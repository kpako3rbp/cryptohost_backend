export const formatDateTime = (dateString: Date, hasTime: boolean = true) => {
  const date = new Date(dateString);
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'мая',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day} ${months[monthIndex]} ${year}${hasTime ? `, ${hours}:${minutes < 10 ? '0' : ''}${minutes}` : 0}`;

  return formattedDate;
};
