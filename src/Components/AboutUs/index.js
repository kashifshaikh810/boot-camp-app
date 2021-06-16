/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const AboutUs = () => {

  const handler = () => {
    document.documentElement.scrollTop = 0
  }

  return (
    <div style={{
      overflow: 'hidden',
      marginBottom: 50
    }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="card text-center"
          style={{ backgroundColor: "#b3b3b3", width: "80%", borderRadius: 15, marginTop: 10}}
        >
          <p
            style={{
              paddingTop: 10,
              fontSize: 30,
              fontStyle: "revert",
              fontWeight: "bold",
              color: "white",
            }}
          >
            About Us
          </p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <img
          src={"image.jpg"}
          style={{
            maxWidth: "50%",
            maxHeight: 600,
            minWidth: '50%',
            borderRadius: 20,
            marginBottom: 20,
            marginLeft: 20,
            paddingTop: 10,
          }}
        />
        <div
          className="card text-center"
          style={{
            maxWidth: "40%",
            maxHeight: 400,
            minWidth: '40%',
            borderRadius: 15,
            marginTop: 10,
            overflow: 'hidden',
            backgroundColor: "#b3b3b3",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: 19, color: "#f1f1f1" }}>
            These excellant intentions were strengthed when he enterd the Father
            Superior's diniing-room, though, stricttly speakin, it was not a
            dining-room, for the Father Superior had only two rooms alltogether;
            they were, however, much larger and more comfortable than Father
            Zossima's. But tehre was was no great luxury about the furnishng of
            stained, but evreything was shining with cleanlyness, and there were
            many chioce flowers in the windows; the most sumptuous thing in the
            afterwards that there were five dishes.the most sumptuous thing in the
            afterwards that there were five dishes.here (and the
            with that Aesop, thta buffoon, that Pierrot, and have merely been
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <img
          src={"imageTwo.jpg"}
          style={{
            maxWidth: "50%",
            maxHeight: 500,
            minWidth: '50%',
            borderRadius: 20,
            marginBottom: 20,
            marginLeft: 20,
          }}
        />
        <div
          className="card text-center"
          style={{
            maxWidth: "40%",
            maxHeight: 500,
            minWidth: '40%',
            borderRadius: 15,
            marginTop: 10,
            marginBottom: 30,
            overflow: 'hidden',
            backgroundColor: "#b3b3b3",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: 19, color: "#f1f1f1" }}>
            Miusov, as a man man of breeding and deilcacy, could not but feel
            some inwrd qualms, when he reached the Father Superior's with Ivan:
            he felt ashamed of havin lost his temper. He felt that he ought to
            have disdaimed that despicable wretch, Fyodor Pavlovitch, too much
            to have been upset by him in Father Zossima's cell, and so to have
            forgotten himself. "Teh monks were not to blame, in any case," he
            reflceted, on the steps. "And if they're decent people here (and the
            with that Aesop, thta buffoon, that Pierrot, and have merely beenhere (and the
            they were, however, much larger and more comfortable than Father
            with that Aesop, thta buffoon, 
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <img
          src={"imageThree.jpg"}
          style={{
            maxWidth: "50%",
            maxHeight: 500,
            minWidth: '50%',
            borderRadius: 20,
            marginBottom: 20,
            marginLeft: 20,
          }}
        />
        <div
          className="card text-center"
          style={{
            maxWidth: "40%",
            maxHeight: 500,
            minWidth: '40%',
            borderRadius: 15,
            overflow: 'hidden',
            backgroundColor: "#b3b3b3",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: 19, color: "#f1f1f1" }}>
            We must apologize most humbly, your reverance," began Miusov,
            simpering affably, and speakin in a dignified and respecful tone.
            "Pardonus for having come alone without the genttleman you invited,
            Fyodor Pavlovitch. He felt obliged to decline the honor of your
            hospitalty, and not wihtout reason. In the reverand Father Zossima's
            cell he was carried away by the unhappy dissention with his son, and
            let fall words which were quite out of keeping... in fact, quite
            unseamly... as" -- he glanced at the monks -- "your reverance is, no
            doubt, already aware. And therefore, recognising that he had been to
          </p>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10, marginTop: 10}}>
      <button type="button" onClick={handler} class="btn btn-outline-success">Go to Top</button>
      </div>
    </div>
  );
};

export default AboutUs;
