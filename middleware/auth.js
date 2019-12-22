export default function ({ store, redirect }) {
  if (!store.getters.isLogged) {
    return redirect('/auth')
  }
}