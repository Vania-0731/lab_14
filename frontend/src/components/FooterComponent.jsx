function FooterComponent() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <small>&copy; {new Date().getFullYear()} SeriesApp. Todos los derechos reservados.</small>
      </div>
    </footer>
  );
}

export default FooterComponent;