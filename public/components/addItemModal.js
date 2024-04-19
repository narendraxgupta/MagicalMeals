
window.additemmodal = function (){
    return `
    <div
    class="modal fade"
    id="addItemModal"
    tabindex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLabel">Add Item</h5>
        </div>
        <div class="modal-body">
          <form action="/menu/additem" enctype="multipart/form-data" id="additemform">
            <div class="mb-3">
              <label for="addItemName" class="form-label">Item Name</label>
              <input
                type="text"
                class="form-control"
                id="addItemName"
                placeholder="Enter item name"
                name="itemName"
              />
            </div>
            <div class="mb-3">
              <label for="editItemPrice" class="form-label">Item Price</label>
              <input
                type="number"
                class="form-control"
                id="editItemPrice"
                placeholder="Enter item price"
                name="price"
              />
            </div>
            <div class="mb-3">
              <label for="category" class="form-label">Category</label>
              <select class="form-select" id="category" name="category">
                <option value="chinese">Chinese</option>
                <option value="north-indian">North Indian</option>
                <option value="south-indian">South Indian</option>
                <option value="drinks">Drinks</option>
                <option value="ice-cream">Ice-Cream</option>

                <!-- Add more categories here -->
              </select>
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Item Image</label>
              <input
                type="file"
                class="form-control"
                id="image"
                name="image"
                accept="image/"
              />
            </div>
            <button
            type="submit"
            class="btn btn-primary"
          >
            Add
          </button>
          </form>
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
