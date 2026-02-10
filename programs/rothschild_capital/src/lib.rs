pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("CKisbvKYZ2Ft9Pwbs5MxbEdbUaRpSNYBcMJuca5heB3");

#[program]
pub mod rothschild_capital {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::handler(ctx)
    }
}
