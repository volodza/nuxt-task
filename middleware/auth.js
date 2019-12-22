export default function ({ store, redirect }) {
  if (!store.state.isLogged) {
    return redirect('/auth')
  }
}