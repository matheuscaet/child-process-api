const getUser = () => {
    let user = {
      name: 'Matheus',
      address: '123 Main St'
    }
    return user;
  };
  
process.on('message', (msg) => {
    const user = getUser();
    process.send(user);
    console.log(msg)
});