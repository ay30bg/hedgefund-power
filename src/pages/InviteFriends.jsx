import React, {
  useEffect,
  useState,
  useCallback,
} from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../styles/invite.css";

import { useCurrency } from "../context/CurrencyContext";

import { useAuth } from "../context/AuthContext";

import {
  FiArrowLeft,
  FiUserPlus,
  FiCopy,
  FiShare2,
  FiGift,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 5;

const InviteFriends = () => {
  const navigate = useNavigate();

  const { currency } = useCurrency();

  const { token } = useAuth();

  const API_URL =
    process.env.REACT_APP_API_URL;

  const [copied, setCopied] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [referralLink, setReferralLink] =
    useState("");

  const [stats, setStats] = useState({
    totalInvites: 0,
    totalEarned: 0,
  });

  const [referrals, setReferrals] =
    useState([]);

  useEffect(() => {
  document.title = "Invite Friends | Hedgefund Power";
}, []);

  // ================= FORMAT =================
  const format = (value) =>
    `${currency.symbol}${(
      Number(value || 0) *
      currency.rate
    ).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  // ================= PAGINATION =================
  const totalPages = Math.ceil(
    referrals.length / ITEMS_PER_PAGE
  );

  const paginatedReferrals =
    referrals.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,

      currentPage *
        ITEMS_PER_PAGE
    );

  // ================= FETCH REFERRALS =================
  const fetchReferrals = useCallback(
    async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API_URL}/api/referrals/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;

        // ===== REFERRAL LINK =====
        const link = `${window.location.origin}/signup?ref=${data.referralCode}`;

        setReferralLink(link);

        // ===== STATS =====
        setStats({
          totalInvites:
            data.totalInvites || 0,

          totalEarned:
            data.totalEarned || 0,
        });

        // ===== REFERRALS =====
        setReferrals(
          data.referrals || []
        );

      } catch (err) {
        console.error(
          "Referral fetch error:",
          err
        );

      } finally {
        setLoading(false);
      }
    },
    [API_URL, token]
  );

  useEffect(() => {
    if (token && API_URL) {
      fetchReferrals();
    }
  }, [
    fetchReferrals,
    token,
    API_URL,
  ]);

  // ================= COPY LINK =================
  const copyLink = () => {
    if (!referralLink) return;

    navigator.clipboard.writeText(
      referralLink
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // ================= SHARE =================
  const shareInvite = () => {
    if (!referralLink) return;

    const text = `Join this app and earn rewards! Use my invite link: ${referralLink}`;

    if (navigator.share) {
      navigator.share({
        title: "Invite Friends",
        text,
        url: referralLink,
      });

    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          text
        )}`
      );
    }
  };

  // ================= FULL PAGE LOADING =================
  if (loading) {
    return (
      <div className="invite-page">

        <div className="invite-loading">

          <div className="invite-spinner"></div>

          <p>
            Loading referrals...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="invite-page">

      {/* ================= HEADER ================= */}
      <div className="invite-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
        </button>

        <h2>Invite Friends</h2>

      </div>

      {/* ================= HERO ================= */}
      <div className="invite-hero">

        <FiGift className="invite-hero-icon" />

        <h3>Referral Program</h3>

        <p>
          Invite friends and earn 5%
          commission on their first
          deposit.
        </p>

        {/* ================= REFERRAL LINK ================= */}
        <div className="referral-box">

          <span>
            Your Invite Link
          </span>

          <div className="code-row">

            <small className="ref-link">
              {referralLink}
            </small>

            <button
              onClick={copyLink}
              className="copy-btn"
            >
              {copied ? (
                "Copied ✓"
              ) : (
                <FiCopy />
              )}
            </button>

          </div>

        </div>

      </div>

      {/* ================= STATS ================= */}
      <div className="invite-card">

        <div className="invite-item">

          <FiUserPlus />

          <div>

            <h4>
              Total Invites
            </h4>

            <p>
              {stats.totalInvites} users
            </p>

          </div>

        </div>

        <div className="invite-item">

          <FiGift />

          <div>

            <h4>
              Total Earned
            </h4>

            <p>
              {format(
                stats.totalEarned
              )}
            </p>

          </div>

        </div>

      </div>

      {/* ================= REFERRALS ================= */}
<div className="referral-list">

  <h4>
    Your Referrals
  </h4>

  {referrals.length === 0 ? (

    <p className="empty-text">
      No referrals yet
    </p>

  ) : (

    <>
      {paginatedReferrals.map(
        (ref, i) => (
          <div
            key={i}
            className="referral-row"
          >

            <span className="referral-email">
              {ref.name?.length > 18
                ? `${ref.name.substring(
                    0,
                    18
                  )}...`
                : ref.name}
            </span>

            <span
              className={
                ref.status ===
                "Completed"
                  ? "success"
                  : "pending"
              }
            >
              {ref.status}
            </span>

            <span>
              {format(ref.reward)}
            </span>

          </div>
        )
      )}

      {/* ================= PAGINATION ================= */}
      {referrals.length >
        ITEMS_PER_PAGE && (

        <div className="ref-pagination">

          <button
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                (prev) => prev - 1
              )
            }
          >
            Prev
          </button>

          <span>
            {currentPage} /{" "}
            {totalPages}
          </span>

          <button
            disabled={
              currentPage ===
              totalPages
            }
            onClick={() =>
              setCurrentPage(
                (prev) => prev + 1
              )
            }
          >
            Next
          </button>

        </div>

      )}

    </>
  )}

</div>
      
      {/* ================= RULES ================= */}
      <div className="invite-rules">

        <h4>
          How it works
        </h4>

        <ul>

          <li>
            Invite others using your
            personalized referral link
          </li>

          <li>
            Referred users create an
            account through your link
          </li>

          <li>
            Receive a 5% referral bonus
            on their first successful
            deposit
          </li>

          <li>
            Bonuses are processed and
            credited automatically in
            real time
          </li>

        </ul>

      </div>

      {/* ================= SHARE BUTTON ================= */}
      <button
        className="share-btn"
        onClick={shareInvite}
      >

        <FiShare2 />

        Share Invite Link

      </button>

    </div>
  );
};

export default InviteFriends;
