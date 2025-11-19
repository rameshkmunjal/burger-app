import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../Component/Navbar';
import Footer from '../../../Component/Footer';
import { convertObj2Date } from '../../../Functions/commonFunctions';
import DeleteConfirmModal from '../../../Component/DeleteConfirmModal';
import EditReleaseModal from '../../../Component/EditReleaseModal'; // ✅ import edit modal

const ViewInventory = () => {
  const { id: inventoryId } = useParams();

  const [message, setMessage] = useState('');
  const [itemName, setItemName] = useState('');
  const [buyDate, setBuyDate] = useState('');
  const [balanceQty, setBalanceQty] = useState(0);
  const [releaseData, setReleaseData] = useState([]);

  const [deletingReleaseId, setDeletingReleaseId] = useState(null);
  const [editingRelease, setEditingRelease] = useState(null); // ✅ store release to edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // ✅ control modal

  const navigate = useNavigate();
  const url = "http://localhost:5000";

  // ✅ fetch inventory details
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/inventory/item/${inventoryId}`);
      const item = response.data;
      if (item) {
        setMessage('');
        setItemName(item.itemName);
        setBuyDate(item.buyDate);
        setBalanceQty(item.balanceQty);
        setReleaseData(item.releases);
      } else {
        setMessage('response data not received');
        setItemName('');
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message || "Error fetching inventory");
      setItemName('');
    }
  };

  useEffect(() => {
    fetchData();
  }, [inventoryId]);

  const refreshData = () => fetchData();

  const renderedList = releaseData.map((i) => (
    <tr key={i.releaseId}>
      <td className="align-c">{convertObj2Date(i.releaseDate)}</td>
      <td className="align-c">{i.releaseId}</td>
      <td className="align-c">{i.qty}</td>
      <td className="align-r">{i.amt.toFixed(2)}</td>
      <td className="align-r">{i.releasedBy}</td>
      <td className="align-r">{i.releasedTo}</td>

      {/* ✅ Edit button triggers modal instead of redirect */}
      <td className="align-c">
        <button
          className="click-btn btn-success"
          onClick={(e) => {
            e.preventDefault();
            setEditingRelease(i);
            setIsEditModalOpen(true);
          }}
        >
          Edit
        </button>
      </td>

      {/* ✅ Delete button */}
      <td className="align-c">
        <button
          className="click-btn btn-danger"
          onClick={(e) => {
            e.preventDefault();
            setDeletingReleaseId(i.releaseId);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="page-container">
      <Navbar />
      <div className="back-btn-div">
        <button className="click-btn btn-danger" onClick={() => navigate(-1)}>Back</button>
      </div>
      <div>{message}</div>

      <>
        <h1 className="align-c">Release Inventory</h1>
        <div className='align-c' style={{ paddingLeft: 20, paddingBottom: 20 }}>
          <h4>Item : {itemName}</h4>
          <p>Date: {convertObj2Date(buyDate) || "—"}</p>
          <p>Quantity Available : {balanceQty}</p>
        </div>

        <table className='tbl'>
          <thead>
            <tr>
              <th>Release Date</th>
              <th>Release ID</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Release By</th>
              <th>Release To</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>{renderedList}</tbody>
        </table>
      </>

      <Footer />

      {/* ✅ Delete confirmation modal */}
      <DeleteConfirmModal
        isOpen={!!deletingReleaseId}
        releaseId={deletingReleaseId}
        inventoryId={inventoryId}
        onClose={() => setDeletingReleaseId(null)}
        onDeleted={refreshData}
      />

      {/* ✅ Edit release modal */}
      <EditReleaseModal
        isOpen={isEditModalOpen}
        release={editingRelease}
        inventoryId={inventoryId}
        onClose={() => setIsEditModalOpen(false)}
        onUpdated={refreshData}
      />
    </div>
  );
};

export default ViewInventory;
