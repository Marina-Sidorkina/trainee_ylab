// Масси цветов для отрисовки фигур
const colors = [
  'rgba(55,66,88,1)',
  'rgba(102,111,136,1)',
  'rgba(211,94,53,1)',
  'rgba(55,66,88,0.5)',
  'rgba(102,111,136,0.5)',
  'rgba(211,94,53,0.5)'
];

// Получение случайного цвета для отрисовки фигур
export default function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
