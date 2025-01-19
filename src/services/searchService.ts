function wrapPromise(promise: Promise<any>) {
    let status = 'pending';
    let result: any;
    const suspender = promise.then(
      (res) => {
          console.log("suspender promise then 5")  //after this pont searchResult component re renders
          console.log(res)  
  
        status = 'success';
        result = res;
      },
      (err) => {
        status = 'error';
        result = err;
      }
    );
  
    return {
      read() {
        if (status === 'pending') {
          throw suspender; 
        } else if (status === 'error') {
          throw result; 
        } else if (status === 'success') {
          console.log("success after resolve") 
          return result; 
        }
      },
    };
  }
  
export const fetchData = (query: string) => {
    return wrapPromise(
      fetch('https://reduxcart-cygbit-default-rtdb.firebaseio.com/shopco_products.json')
        .then((response) => {
           console.log("3")
           console.log(response); 
           return response.json()
          })
        .then((data) => {
          console.log("4")
          console.log(data) 
          const productsArray = Array.isArray(data) ? data : Object.values(data);
  
          return productsArray.filter((product: any) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
        })
    );
  };