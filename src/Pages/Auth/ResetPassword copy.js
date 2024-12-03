import React, { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("the email is required");
      return;
    }

    console.log("logout", "success");
  };

  return (
    <div className="formUser">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form
                className="card-body p-lg-5"
                method="POST"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                {error && (
                  <div
                    style={{
                      color:
                        error === "Success login, please wait!"
                          ? "green"
                          : "red",
                    }}
                  >
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="pb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    required
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-2 w-100"
                  >
                    send email verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
