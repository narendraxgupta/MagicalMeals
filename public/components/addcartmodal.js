window.addcartmodal = function(){
    return `
    <div
    class="modal fade"
    id="addcartModal"
    tabindex="-1"
    aria-labelledby="addcartModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addcartModalLabel">Add Item</h5>
        </div>
        <div class="modal-body">
            <div class="mb-3">
              <label for="itemquantity" class="form-label">Item Quantity</label>
              <input
                type="number"
                class="form-control"
                id="quantity"
                name="quantity"
                value="1"
              />
           </div>
            <button
            class="btn btn-primary addtocartbtn"
            >
            Add to cart
          </button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
    `
}