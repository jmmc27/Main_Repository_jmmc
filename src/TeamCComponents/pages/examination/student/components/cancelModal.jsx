import "../s_examPage.css";

export default function cancelModal() {
    
    return (<>
        <div className="modal fade" id="cancelModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" >
                <div className="modal-content" id="modalBody">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">You are leaving your examination.</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        TEXT DESCRIPTION GOES HERE
                    </div>
                    <div className="modal-footer">
                        <button type="button" id="modalProceed" className="btn" data-bs-dismiss="modal">Proceed</button>
                        <button type="button" id="modalClose" className="btn" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}