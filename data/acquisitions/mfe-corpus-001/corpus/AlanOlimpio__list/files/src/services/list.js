export function getList(tab) {
  const listPromise = new Promise((resolve) => {
    setTimeout(() => {
      if (tab === 'active') {
        resolve([
          {
            name: 'Helena',
          },
          {
            name: 'Laura',
          },
          {
            name: 'Maria Alice',
          },
          {
            name: 'Sophia',
          },
          {
            name: 'Manuela',
          },
          {
            name: 'Maitê',
          },
          {
            name: 'Liz',
          },
          {
            name: 'Cecília',
          },
          {
            name: 'Isabella',
          },
          {
            name: 'Luísa',
          },
        ]);
      }

      if (tab === 'disabled') {
        resolve([
          {
            name: 'Miguel',
          },
          {
            name: 'Arthur',
          },
          {
            name: 'Gael',
          },
          {
            name: 'Théo',
          },
          {
            name: 'Heitor',
          },
          {
            name: 'Ravi',
          },
          {
            name: 'Davi',
          },
          {
            name: 'Bernardo',
          },
          {
            name: 'Noah',
          },
          {
            name: 'Gabriel',
          },
        ]);
      }
    }, 250);
  });
  return listPromise.then((response) => response);
}
