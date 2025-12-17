export default function WalletCard({ children }) {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm rounded-4">
            <div className="card-body p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
