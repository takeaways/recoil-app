let id = 1;
export function getId() {
  return id++;
}
export function create(text: string) {
  return {
    id: getId(),
    text,
    isComplete: false,
  };
}
