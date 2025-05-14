import React from "react";
import "../styles/auth.css";

function AccessNotif() {
  return (
    <section class="signup">
      <div class="container">
        <div class="signup-content">
          <div class="signup-form">
            <h2 class="form-title">Profile</h2>
            <form method="POST" class="register-form" id="register-form">
              <div class="form-group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="First Name"
                />
              </div>

              <div class="form-group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Last Name"
                />
              </div>
              <div class="form-group">
                <input type="text" name="age" id="age" placeholder="Age" />
              </div>
              <div class="form-group">
                <select name="pass" id="pass">
                  <option value="">Gender</option>
                  <option value="Input1">Input 1</option>
                  <option value="Input2">Input 2</option>
                  <option value="Input3">Input 3</option>
                </select>
              </div>

              <div class="form-group">
                <input
                  type="text"
                  name="height"
                  id="height"
                  placeholder="Height                                                            cm"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="weight"
                  id="weight"
                  placeholder="Weight                                                           kg"
                />
              </div>
              <div class="form-group"></div>
              <div class="form-group"></div>
              <div class="form-group"></div>
              <div class="form-group form-button">
                <input
                  type="submit"
                  name="conitnue"
                  id="continue"
                  class="form-submit"
                  value="Continue"
                />
              </div>
            </form>
          </div>

          <div class="signup-image">
            <img src="1.png"></img>
            <hr></hr>
            <h3>Accessibility</h3>
            <p>Text Size</p>
            <button class="optbuttons">Normal</button>
            <button class="optbuttons" style={{ marginLeft: "5px" }}>
              Large
            </button>
            <div class="form-group">
              <hr></hr>
              <p>Select all applicable</p>
              <button class="sel">Color Blind</button>
              <button class="sel">Voice Over</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccessNotif;
