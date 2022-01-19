const objs = document.querySelectorAll('.modal-manager');
for (const obj of objs) {
  const search = obj.querySelector('#searchUsername');

  search.addEventListener('input', async () => {
    const usernameResultObj = obj.querySelector('#usernameResult');
    usernameResultObj.innerHTML = `<div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`;
    const idResultObj = obj.querySelector('#idResult');
    idResultObj.innerHTML = `<div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`;

    const searchUsername = search.value;
    const result = await fetch(
      `http://localhost:3000/admin/manager/search?username=${searchUsername}`
    );
    const { account_id, username } = await result.json();
    usernameResultObj.innerHTML = `<fieldset disabled>
                                <input type="text" class="form-control" id="foundUsername" name="username" value="${username}">
                                </fieldset>`;
    idResultObj.innerHTML = `<fieldset disabled>
                                <input type="number" class="form-control" id="id" value="${account_id}">
                                </fieldset>
                                <input type="number" class="form-control" id="id" name="id" value="${account_id}" hidden>`;
  });
}
