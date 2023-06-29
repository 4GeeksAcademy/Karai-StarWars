import React, { useState } from "react";
import LearnMore from "./LearnMore.jsx"
import { useContext } from 'react'
import { Context } from '../store/appContext'
import styles from "./Styles.module.css"


const CharacterCard = ({ character, uid }) => {

    const { sotre, actions } = useContext(Context)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div>
            <div>
                <div className={`card ${styles.cardsStyle}`}>
                    <div className="card-body">
                        <img
                            style={{
                                objectFit: "cover",
                                height: "240px",
                                objectPosition: "top",
                            }}
                            src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`}
                            className="card-img-top" 
                            alt="..."
                        />
                        <h5 className="card-title">{character.name}</h5>
                        <p className="card-text">Gender: {character.gender}</p>
                        <p className="card-text">Height: {character.height}</p>
                        <div className="d-felx justify-content-between">
                            <button onClick={openModal} href="" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Learn More</button>
                            <button onClick={() => actions.addFavorite(character.name)} href="#"><i className="fa-regular fa-star" style={{ color: "#fae500" }}></i></button>
                        </div>
                    </div>
                </div>
            </div>
            {
                isModalOpen &&
                <LearnMore
                    activateModal={isModalOpen}
                    closeModal={closeModal}
                    character={character}
                    uid={uid}
                />
            }
        </div>
    )
}

export default CharacterCard