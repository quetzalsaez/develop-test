import TotalAmounts from "./features/totalAmounts.js";

export default function CartApp() {
  const { useState, useEffect } = React
  const [items, setItems] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    getListItems();
    listenScreenResize();
  }, []);

  function listenScreenResize() {
    function evalDesktop() {
      let innerWidth = window.innerWidth
      setIsDesktop(innerWidth > 550)
    }
    window.addEventListener("resize", () => {
      evalDesktop()
    });
    evalDesktop()
  }

  function getListItems() {
    fetch("../../index.json")
      .then(response => {
        return response.json();
      })
      .then(function (data) {
        setItems(data.items)
      });
  }

  function removeListItem(sku) {
    let localItems = items;
    /* Erase selected item */
    setItems(localItems.filter(item => item.sku !== sku))
  }

  function addListItemQuantity(i) {
    let localItems = items;
    if (localItems[i].quantity < localItems[i].stockLevel) {
      /* Update item list */
      localItems[i].quantity++
      setItems([...localItems])
    }
  }
  function restListItemQuantity(i) {
    let localItems = items;
    if (localItems[i].quantity > 1) {
      /* Update item list */
      localItems[i].quantity--
      setItems([...localItems])
    }
  }

  function buyArticles() {
    /* If API would work */
    if (false) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items)
      };
      fetch("https://apps.xyz/endpoint/buy-items", requestOptions)
        .then(response => response.json())
        .then(res => console.log(res));
    } else {
      alert('Thank you for buying with us.')
    }
  }

  function handleChange(e, i) {
    let localItems = items
    let localItem = localItems[i];
    if (localItem.stockLevel == 0) {
      localItem.quantity = 0
    } else if (localItem.stockLevel < parseInt(e.target.value)) {
      localItem.quantity = localItem.stockLevel
    } else if (e.target.value == "") {
      localItem.quantity = ""
    } else if (isNaN(e.target.value) || e.target.value == 0) {
      localItem.quantity = 1
    } else {
      localItem.quantity = parseInt(e.target.value)
    }
    localItems[i] = localItem
    setItems([...localItems])
  }

  function handleBlur(e, i) {
    let localItems = items
    if (e.target.value == "") {
      localItems[i].quantity = 1
    }
    setItems([...localItems])
  }

  return (
    <div className="basket-content flex-column align-center">
      <div className="basket-content__text">
        <h2>Your Basket</h2>
        <p>Items you have added to your basket are shown below. Adjust the quantities or remove items before continuing purchase</p>
      </div>
      {items.length > 0 && (<div>
        {isDesktop ?
          /* Desktop list */
          (<div className="basket-content__items-list">
            <table>
              <tr>
                <th className="text-left">Product</th>
                <th className="text-right">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-right">Cost</th>
                <th></th>
              </tr>
              {
                items.map((item, i) =>
                  <tr className={item.stockLevel == 0 ? "disabled-item" : ""} key={item.sku}>
                    {item.size ? <td>{item.name}, {item.size}</td> : <td>{item.name}</td>}
                    <td className="text-right">£{item.price}</td>
                    <td className="item-quantity">
                      <AddRestButton index={i} item={items[i]} onChange={(e) => handleChange(e, i)} onBlur={(e) => handleBlur(e, i)} addQuantity={() => addListItemQuantity(i)} restQuantity={() => restListItemQuantity(i)} />
                    </td>
                    <td className="text-right items-cost">£{(item.quantity * item.price).toFixed(2)}</td>
                    <td className="text-right item-erase">
                      <RemoveButton onClick={() => removeListItem(item.sku)} />
                    </td>
                  </tr>
                )
              }
            </table>
          </div>) :
          /* Mobile list */
          (<div className="basket-content__items-list mobile">
            {
              items.map((item, i) =>
                <div className={item.stockLevel == 0 ? "disabled-item single-item" : "single-item"} key={item.sku}>
                  <div className="item-title"> {item.size ? <p>{item.name}, {item.size}</p> : <p>{item.name}</p>}</div>
                  <div className="item-price flex-row space-between"><p>Price</p><p>£{item.price}</p></div>
                  <div className="item-quantity flex-row space-between"><p>Quantity</p><AddRestButton index={i} item={items[i]} onChange={(e) => handleChange(e, i)} onBlur={(e) => handleBlur(e, i)} addQuantity={() => addListItemQuantity(i)} restQuantity={() => restListItemQuantity(i)} /></div>
                  <div className="item-cost flex-row space-between"><p>Cost</p><p>£{(item.quantity * item.price).toFixed(2)}</p></div>
                  <div className="item-erase flex-row space-between"><p>Remove</p><RemoveButton onClick={() => removeListItem(item.sku)} /></div>
                </div>
              )
            }
          </div>)}
        <div className="basket-content__total-price flex-column align-end">
          <TotalAmounts itemList={items} />
          <button onClick={() => buyArticles()} className="action-button">
            <span>BUY NOW</span>
          </button>
        </div>
      </div>)}
    </div>
  )
}

function AddRestButton(props) {
  return (
    <div class="add-rest-button">
      {props.item.stockLevel == 0 ? <p>No items left</p> : (props.item.quantity == props.item.stockLevel && <p>Full stock</p>)}
      <div className="flex-row space-between align-center">
        <button className={`${(props.item.quantity == '1' || props.item.quantity == '0') ? 'unable' : ''}`} onClick={props.restQuantity}>-</button>
        <input pattern="[0-9]*" onBlur={props.onBlur} onChange={props.onChange} name={props.i} type="text" value={props.item.quantity} />
        <button className={`${props.item.quantity == props.item.stockLevel ? 'unable' : ''}`} onClick={props.addQuantity}>+</button>
      </div>
    </div>
  )
}

function RemoveButton(props) {
  return (
    <button onClick={props.onClick}>
      <svg width="18px" height="20px" viewBox="0 0 18 20" version="1.1">
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-629.000000, -53.000000)" fill="#448AFF" fill-rule="nonzero"><g id="Shape" transform="translate(629.000000, 53.000000)"><path d="M16.3046003,2.32052692 L15.6623801,18.3225196 C15.6400842,18.8780585 15.1455712,19.3333335 14.5652051,19.3333335 L3.43479489,19.3333335 C2.85347201,19.3333335 2.35992936,18.8783977 2.33761988,18.3225196 L1.69539968,2.32052692 C1.68801669,2.13656807 1.52641975,1.99317564 1.33446276,2.00025097 C1.14250576,2.00732634 0.99287893,2.16219013 1.00026188,2.34614898 L1.64248211,18.3481417 C1.67916032,19.2620406 2.47974449,20 3.43479489,20 L14.5652051,20 C15.5191118,20 16.3208461,19.2618808 16.3575179,18.3481417 L16.9997381,2.34614898 C17.0071211,2.16219013 16.8574942,2.00732634 16.6655372,2.00025097 C16.4735802,1.99317564 16.3119833,2.13656807 16.3046003,2.32052692 Z"></path><path d="M9,5.33333333 L9,16.6666667 C9,16.8507616 9.22385765,17 9.5,17 C9.77614235,17 10,16.8507616 10,16.6666667 L10,5.33333333 C10,5.14923843 9.77614235,5 9.5,5 C9.22385765,5 9,5.14923843 9,5.33333333 Z"></path><path d="M5.00014692,5.34313572 L5.33347835,16.6764637 C5.33889055,16.8604789 5.49245104,17.0052653 5.67646536,16.9998531 C5.86047964,16.9944408 6.00526525,16.8408796 5.99985308,16.6568643 L5.66652165,5.32353633 C5.66110945,5.13952109 5.50754896,4.99473472 5.32353464,5.00014692 C5.13952036,5.00555915 4.99473475,5.15912045 5.00014692,5.34313572 Z"></path><path d="M12.3334784,5.32353633 L12.0001469,16.6568643 C11.9947348,16.8408796 12.1395204,16.9944408 12.3235346,16.9998531 C12.507549,17.0052653 12.6611094,16.8604789 12.6665216,16.6764637 L12.9998531,5.34313572 C13.0052652,5.15912045 12.8604796,5.00555915 12.6764654,5.00014692 C12.492451,4.99473472 12.3388906,5.13952109 12.3334784,5.32353633 Z"></path><path d="M0.346153846,3 L17.6538462,3 C17.8450216,3 18,2.77614235 18,2.5 C18,2.22385765 17.8450216,2 17.6538462,2 L0.346153846,2 C0.154978373,2 0,2.22385765 0,2.5 C0,2.77614235 0.154978373,3 0.346153846,3 Z"></path><path d="M5.67967511,2 L6.07140802,1.16010409 C6.20348912,0.876915239 6.63259137,0.627806422 6.98691066,0.627806422 L11.0130893,0.627806422 C11.3694198,0.627806422 11.7957896,0.875368826 11.928592,1.16010409 L12.3203249,2 L13,1.76683853 L12.6082671,0.926942622 C12.364295,0.403853714 11.6687491,0 11.0130893,0 L6.98691066,0 C6.33328379,0 5.63499177,0.405382831 5.39173291,0.926942622 L5,1.76683853 L5.67967511,2 Z"></path></g></g></g>
      </svg>
    </button>
  )
}